export function Key({ value, enterDigit, rowSpan, colSpan, color }) {
    let c = 'digit';
    c = rowSpan ? c + ' rowSpan' : c;
    c = colSpan ? c + ' colSpan' : c;
    c = color ? c + ' ' + color : c;
    return <button className={c} onClick={() => enterDigit({ value })}>{value}</button>
}