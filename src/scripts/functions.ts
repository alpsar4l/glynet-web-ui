// @ts-ignore
import { activeModal } from './stores.ts';

export function colorBrightness(color: string, percent: number) {
    let num = parseInt(color.replace("#",""),16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;

    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
}

export function hexToRgb(hex: string, alpha: number = 1) {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
}

export const select = (name: string) => <HTMLElement>window.document.querySelector(name);

export const selectAll = (name: string) => window.document.querySelectorAll<HTMLElement>(name);

export const bottomAlert = (text: string) => {
    let bottomAlertTimeout;
    let alertBox = select('.bottom-alert');
    let alertContent = select('.b-alert-content span');

    alertContent.innerText = text;
    alertBox.style.bottom = "30px";
    alertBox.style.opacity = "1";
    alertBox.style.transformStyle = "scale(1)";

    bottomAlertTimeout = setTimeout(() => {
        alertBox.style.bottom = "-70px";
        alertBox.style.opacity = "0";
        alertBox.style.transformStyle = "scale(0.50)";
    }, 5000);
}

export function modal(id: string, open: boolean) {
    if (open) {
        selectAll('.modal').forEach(m => m.style.display = 'none');

        let m = <HTMLElement>select(`#${id}`);
        let m_content = <HTMLElement>select(`#${id} .modal-content`);

        activeModal.set(id);

        m_content.style.display = 'block';
        m.style.display = 'flex';
    } else {
        let m = <HTMLElement>select(`#${id}`);
        let m_content = <HTMLElement>select(`#${id} .modal-content`);

        m_content.classList.add('modal-hide');

        setTimeout(() => {
            m.style.display = 'none';
            m_content.style.display = 'none';
            m_content.classList.remove('modal-hide');
        }, 200);
    }
}