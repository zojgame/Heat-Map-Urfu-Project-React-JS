import s from "./Mark.module.scss";

// const MyMark = () => {
//     return (
//         <div className={s.mark}>
//             <div className={s.tail}>
//                 <div className={s.text}>
//                     7
//                 </div>
//             </div>
//         </div>
//     )
// }

import L from 'leaflet';

const MyMark = new L.Icon({
    iconUrl: "./marker.png",
    iconSize: [64,64],
    iconAnchor: [32, 64],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
});

export { MyMark };
