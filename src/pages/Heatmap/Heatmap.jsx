import {MapContainer, TileLayer, useMapEvents, GeoJSON, Marker} from 'react-leaflet';
import {createContext, useContext, useState, useEffect} from 'react';
import MarkerClusterGroup from "react-leaflet-cluster";
import Transition from 'react-transition-group/Transition';
import { Typography, Paper } from "@material-ui/core";
import {Tooltip} from "react-leaflet";
import { nanoid } from 'nanoid';
import {geojson1} from './geojson/geojson1';
import { geojson2 } from './geojson/geojson2';
import s from './Heatmap.module.scss';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { idsOfRegions } from './geojson/idsOfRegions';
import { getApiRequest } from '../../api/requests/getApiRequest';
import { URL_RESULTS } from '../../api/apiConst';
import sharaga from './images/sharaga.jpg';
import "react-leaflet-fullscreen-plugin";
import CreateMarker from './Marker';
import { GetMarksInCluster, SplitAndColoringCluster, GetPointsInCluster } from './Cluster';

// import "react-leaflet-fullscreen-plugin/styles.css";


//стили для SplitedMap для перехода от разделенной карты к обычной
//#region TransitionStyles
const transitionStyle = {
    transition: `opacity 300ms ease-in-out`,
    opacity: 1,
    weight: 0.8,
    fillColor: 'gray',
    fillOpacity: 0.3,
    color: 'rgb(87, 87, 87)',    
}

const transitionStyles = {
    entering: { opacity: 1},
    entered:  { opacity: 1},
    exiting:  { opacity: 0},
    exited:  { opacity: 0},
  };
//#endregion

let markerPoints = [];
let selectedClusterPoints = [];

//контекс для передачи данных хука о приближении карты
const MapContext = createContext(null);

//разделенная карта Свердловской Области
function SplitedMap() {
    const {isMapFar, setIsMapFar} = useContext(MapContext);     

    const mapEvents = useMapEvents({
        //получаем уровень zoom
        zoomend: () => {
            const zoomLevel = mapEvents.getZoom();
            setIsMapFar(zoomLevel <= 6);
        },
    });

    //создаем цвета для всех областей
    const setColor = (id) => {
        let res = idsOfRegions[id];
        
        if(res>0&&res<=4) {
        return { ...transitionStyle,fillColor : isMapFar ? 'red' : 'none' }
        }
        else if(4<res && res<7){
        return{ ...transitionStyle,fillColor : isMapFar ? 'yellow' : 'none' }
        }
        else if(res>7){
        return{ ...transitionStyle,fillColor : isMapFar ? 'green' : 'none' }
        }
        else {
        return {...transitionStyle,transition: "all .35s ease",
        WebkitTransition: "all .35s ease",
        MozTransition: "all .35s ease", weight: 0.6, fillColor: isMapFar ? 'grey' : 'none'}
        }        
    }

        return (
            <>   
                  {/* Вставляем более мелкое разделение на области */}
                 {isMapFar && <GeoJSON data={geojson2} style={{color: 'white'}} key={nanoid()}>
                                <Tooltip>Свердловская область</Tooltip>
                            </GeoJSON>}

                {/* разделение на крупные области с раскраской */}
                <Transition in={isMapFar} timeout={300}>
                    {state => (
                    geojson1.features.map((district) => {
                        return(
                            <GeoJSON data={district} style={{...setColor(district.properties.osm_id), ...transitionStyles[state], color: 'white'}} key={nanoid()}>
                                <Tooltip>Свердловская область</Tooltip>
                            </GeoJSON>                    
                        )
                    }))}
                </Transition>
            </>            
        )
}

//главный компонент карты
function Heatmap(){  
    const [points, setPoints] = useState([]);     
    useEffect(() => {
        getApiRequest(URL_RESULTS).then(response => setPoints(() => ([...points, response.data])));
    },[]);

    const [currentMarker, setCurrentMarker] = useState(points[0]);
    const cornerFirst = L.latLng(58.979918 + 5, 61.528756 + 10);
    const cornerSecond = L.latLng(58.979918 - 5 , 61.528756 - 10);
    const bounds = L.latLngBounds(cornerFirst, cornerSecond);
    const position =   [58.979918, 61.528756];   
    const [isMapFar, setIsMapFar] = useState(true);
    const [isMarkerSelected, setMarkerSelected] = useState(false);    
    const [isClusterSelected, setClusterSelected] = useState(false);    
    
    //объект всех маркеров с кластерами
    const Markers = () => {
        const handleMarkerClick = (point) => {
            setCurrentMarker(point);
            setMarkerSelected(true);
            setClusterSelected(false);
        }
        const handleClusterClick = () => {
            setMarkerSelected(false);
            setClusterSelected(true);
        }

        markerPoints = points;
        return (
            !isMapFar &&
                <MarkerClusterGroup 
                zoomToBoundsOnClick={false}
                spiderfyOnMaxZoom={false}
                iconCreateFunction={CreateCluster}
                onClick={handleClusterClick}
                    >
                    {points[0].length !== 0 && points[0].map((point) => {
                        const {map_object, id} = point;
                        const {latitude, longitude} = map_object;
                        const cords = [latitude, longitude];
                        return (<Marker 
                            key={id} 
                            position={cords} 
                            icon={CreateMarker(point)}
                            eventHandlers={{
                                click: () => {
                                    handleMarkerClick(point)
                                }}}
                                    />);
                    })}
                </MarkerClusterGroup>
    )}   
    
    return (
        //контекст нужен для передачи данных хука в SplitedMap
        <MapContainer className={s.container}  maxBounds={bounds} 
                    center={position} zoom={6} minZoom={6} fullscreenControl={true}                            
        >                       
                <div onClick={() => {
                    setMarkerSelected(false) 
                    setClusterSelected(false)}}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                            <Markers />  
                    <MapContext.Provider value={{isMapFar, setIsMapFar}}> 
                        <SplitedMap />
                    </MapContext.Provider>
                    {/* Popup для кластера и маркера */}
                    {isMarkerSelected && <PopupMarkerMenu point={currentMarker} />}
                    {isClusterSelected && <PopupClusterMenu />}
                </div>
            
            {/* <Fullscreen /> */}
        </MapContainer>
    )
}

//Popup Menu для кластера
function PopupClusterMenu(){
    let sumMarks = 0;
    selectedClusterPoints.forEach((point) => sumMarks += point.score);
    const average = Math.round(sumMarks / selectedClusterPoints.length);

    //находим цвет для средней оценки
    let color = '';
    if(average > 2 && average < 5){
        color='#ff0000';
    }
    else if(average > 4 && average < 7)
    {
        color='#ff7f50';
    }
    else if(average > 6 && average < 9)
    {
        color='#ffff00';
    }
    else if(average > 8 && average < 11)
    {
        color='#9acd32';
    }
    else{
        color='#00ff00';
    }
    return(
        <Paper elevation={24} style={{position:'fixed', width:'15%', height: '61%', top: '25%', left: '0.5%', zIndex: '1000', borderRadius: '20px'}}>
            <img src={sharaga} alt='' style={{width: '60%'}}/>
            <Typography style={{fontWeight: 'bold'}}><div >{selectedClusterPoints[0].map_object.name}</div></Typography>
            <Typography>Количество проголосовавших {selectedClusterPoints.length}</Typography>
            <Typography>Оценка школы <span style={{color: `${color}`}}>{average}</span></Typography>
        </Paper>
    )

}

//Popup Menu для маркера
function PopupMarkerMenu(point) {
    return(
        <Paper elevation={24} style={{position:'fixed', width:'20%', height: '87%', top: '10%', left: '0.5%', zIndex: '1000'}}>
            <Typography>Информация школы дизайнер оформит </Typography>
            <Typography>Оценка школы {point.point.score}</Typography>
        </Paper>
    )
}

//функция создания кластера
 function CreateCluster(cluster) {
    //получаем все точки в текущем кластере
    const markers = cluster.getAllChildMarkers();

    //получаем все точки полученные через api
    const points = markerPoints[0];

    //сравниваем точки кластера со всеми полученными точками,
    //понимаем какие полученные точки находятся в кластере
    const pointsInCluster = GetPointsInCluster(markers, points);

    //обработчик для отображения данных в Popup Cluster
    cluster.addEventListener('click', ()=> {selectedClusterPoints=pointsInCluster})

    //получение оценнок в точках кластера
    const marks = GetMarksInCluster(pointsInCluster);   

    //расскраска кластера в зависимости от оценок
    const html = SplitAndColoringCluster(marks, pointsInCluster);

    return L.divIcon({ html: html, className: 'cluster', iconSize: L.point(32, 32)});
}


export default Heatmap;
