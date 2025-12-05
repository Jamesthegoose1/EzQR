function encodeData(text) {
    let bits = "0100";
    bits += text.length.toString(2).padStart(8, "0");
    for (let c of text) bits += c.charCodeAt(0).toString(2).padStart(8, "0");
    bits += "0000";
    while (bits.length % 8 !== 0) bits += "0";
    const target = 152;
    let padToggle = true;
    while (bits.length < target) {
        bits += padToggle ? "11101100" : "00010001";
        padToggle = !padToggle;
    }
    return bits;
}

function placeFinder(m, x, y) {
    for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
            const border = r === 0 || r === 6 || c === 0 || c === 6;
            const center = r >= 2 && r <= 4 && c >= 2 && c <= 4;
            m[y + r][x + c] = border || center;
        }
    }
}

function buildMatrix(dataBits) {
    const size = 21;
    const m = [...Array(size)].map(() => Array(size).fill(null));
    placeFinder(m, 0, 0);
    placeFinder(m, size - 7, 0);
    placeFinder(m, 0, size - 7);
    for (let i = 8; i < size - 8; i++) {
        m[6][i] = i % 2 === 0;
        m[i][6] = i % 2 === 0;
    }
    let row = size - 1, col = size - 1, dir = -1, bitIdx = 0;
    while (col > 0) {
        if (col === 6) col--;
        for (let i = 0; i < size; i++) {
            const r = row + dir * i;
            if (r < 0 || r >= size) break;
            for (let c = 0; c < 2; c++) {
                const cc = col - c;
                if (m[r][cc] !== null) continue;
                if (bitIdx < dataBits.length) {
                    m[r][cc] = dataBits[bitIdx] === "1";
                    bitIdx++;
                } else {
                    m[r][cc] = false;
                }
            }
        }
        row += dir * (size - 1);
        dir = -dir;
        col -= 2;
    }
    return m;
}

export function generateQR(text) {
    return buildMatrix(encodeData(text));
}

