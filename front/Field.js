import React,{useState, useEffect} from 'react';
import NeuralNetwork from "./NeuralNetwork";
import Switch from "react-switch";
import Graphics from "./Graphics";

const Field = () => {
    const [blocks, setBlocks] = useState([]);
    const [mouse, setMouse] = useState(false);
    const [data, setData] = useState([]);
    const [predictValue, setPredictValue] = useState(0);

    const [trainSwitch, setTrainSwitch] = useState(true);

    const [mainData, setMainData] = useState({});
    const [predictedValue, setPredictedValue] = useState("");

    const initRender = () => {
        const render = []
        const data__ = [...data];
        for(let i = 0; i < 400; i++){
            render.push(<div key={i} className="field_item"
            onMouseEnter={(event)=>{
                if(mouse) {
                    event.target.style.background = "blue";
                    data__[i] = 0.9;
                    setData(data__);
                }
            }
            }
            ></div>)
        }
        setBlocks(render);
    }

    useEffect(() => {
        const data_ = []
        for(let i = 0; i < 400; i++){
            data_.push(0.1)
        }
        setData(data_)
        initRender();
    }, []);

    useEffect(()=>{
        initRender();
    }, [mouse]);

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }

    const Send = () => {
        postData("http://127.0.0.1:5000/api/", {data: data, predict: predictValue, train: trainSwitch})
            .then(data => {
                setMainData(data);
            })
    }

    useEffect(()=>{
        if(Object.keys(mainData).length === 0){
            return 1;
        }
        let max = mainData.output[0][0];
        let maxIndex = 0;
        for (let i = 1; i < mainData.output[0].length; i++) {
            if (mainData.output[0][i] > max) {
                maxIndex = i;
                max = mainData.output[0][i];
            }
        }
        setPredictedValue(maxIndex);
    }, [mainData])

    const Clear = () => {
        const data_ = []
        for(let i = 0; i < 400; i++){
            data_.push(0.1)
        }
        setData(data_)
        const items = document.getElementsByClassName("field_item")
        for(let i = 0; i < items.length; i++){
            items[i].style.background = "white";
        }
    }

    return (
        <div className="main">
            <div className="sector1">
                <div className="Field" onMouseDown={()=>setMouse(true)} onMouseUp={()=>setMouse(false)}>
                    {blocks}
                </div>
                <div className="switch__">
                    <Switch onChange={()=>setTrainSwitch(!trainSwitch)} checked={trainSwitch} />
                    <div className="sw_title"><h2>Train mode</h2></div>
                </div>
                <div className="buttons">
                    <div className="button recognite" onClick={Send}><h3>Recognize</h3></div>
                    <div className="button clear" onClick={Clear}><h3>Clear</h3></div>
                </div>
                {trainSwitch ? <div className="predict_input">
                    <h2>Predict: </h2>
                    <input type="number" min={0} max={9} value={predictValue} onChange={event => setPredictValue(event.target.value)}/>
                </div> : ""}

                <div className="result">
                    <div className="title_res"><h2>Result:</h2></div>
                    <div className="result_number"><h1>{predictedValue}</h1></div>
                </div>
            </div>
            <div className="sector2">
                <NeuralNetwork data={mainData}/>
                <Graphics pred={mainData} gate={predictValue}/>
            </div>
        </div>
    )
}
export default Field;