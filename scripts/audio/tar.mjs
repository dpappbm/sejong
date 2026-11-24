// Reads and writes plain tar archives, so that packing works the same on every system without a dependency.
// Only regular files with short names; the same content always gives the same bytes.

const BLOCK = 512;
const NAME_LIMIT = 100;
const padding = size => (BLOCK - (size % BLOCK)) % BLOCK;
const octal = (value, length) => value.toString(8).padStart(length - 1, '0') + '\0';

/** The sum of the bytes of a header, its checksum field counted as spaces. */
function checksum(header) {
  let sum = 0;
  for (let i = 0; i < BLOCK; i++) sum += i >= 148 && i < 156 ? 32 : header[i];
  return sum;
}

/** The archive of the [name, content] pairs, as a Buffer. */
export function packTar(files) {
  const parts = [];
  for (const [name, content] of files) {
    if (Buffer.byteLength(name) >= NAME_LIMIT) throw new Error(`Name too long for the archive: ${name}`);
    const header = Buffer.alloc(BLOCK);
    header.write(name, 0);
    header.write(octal(0o644, 8), 100); // mode
    header.write(octal(0, 8), 108); // owner
    header.write(octal(0, 8), 116); // group
    header.write(octal(content.length, 12), 124);
    header.write(octal(0, 12), 136); // modification time: fixed
    header.write('0', 156); // regular file
    header.write('ustar\0' + '00', 257);
    header.write(octal(checksum(header), 7) + ' ', 148);
    parts.push(header, content, Buffer.alloc(padding(content.length)));
  }
  return Buffer.concat([...parts, Buffer.alloc(2 * BLOCK)]);
}

/** The [name, content] pairs of an archive. Throws on anything that packTar() does not write. */
export function unpackTar(archive) {
  const files = [];
  let offset = 0;
  while (offset + BLOCK <= archive.length) {
    const header = archive.subarray(offset, offset + BLOCK);
    if (header.every(byte => byte === 0)) return files;
    const text = (start, length) =>
      header
        .toString('utf8', start, start + length)
        .split('\0')[0]
        .trim();
    const name = text(0, NAME_LIMIT);
    if (parseInt(text(148, 8), 8) !== checksum(header)) throw new Error('Damaged archive');
    if (text(156, 1) !== '0' || text(345, 155)) throw new Error(`Unexpected entry in the archive: ${name}`);
    const size = parseInt(text(124, 12), 8);
    const start = offset + BLOCK;
    if (!(size >= 0) || start + size > archive.length) throw new Error('Damaged archive');
    files.push([name, archive.subarray(start, start + size)]);
    offset = start + size + padding(size);
  }
  throw new Error('Damaged archive');
}
