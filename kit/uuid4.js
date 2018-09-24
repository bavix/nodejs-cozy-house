
function rnd_hex(f, o) {
    return (Math.random() * f | o).toString(16)
}

export default function () {
    let result = '';
    for (let i = 0; i < 32; i += 1) {
        switch (i) {
            case 8:
            case 20:
                result += '-';
                result += rnd_hex(16, 0);
                break;

            case 12:
                result += '-';
                result += '4';
                break;

            case 16:
                result += '-';
                result += rnd_hex(4, 8);
                break;

            default:
                result += rnd_hex(16, 0);
        }
    }

    return result;
};
