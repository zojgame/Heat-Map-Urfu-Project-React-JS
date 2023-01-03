import L from 'leaflet';
import mark from './images/marker.png'
import s from './Heatmap.module.scss';

const MyMark = new L.Icon({
    iconUrl: mark,
    iconSize: [64,64],
    iconAnchor: [32, 64],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
});

export const divMark = L.divIcon({
    html: `<div class='${s.mymarker} ${s.progress}'><div class='${s.div_circle}'><span>`
})

// export function GetMarkStyles(point) {

//     return `<div class='${s.mymarker} ${s.progress}'><div class='${s.div_circle}'><span>`;
    
// }

export { MyMark };