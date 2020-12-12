import React, {useEffect, useState} from 'react';


const NeuralNetwork = ({data}) => {
    const [inputNeurons, setInputNeurons] = useState([]);
    const [hiddenNeurons, setHiddenNeurons] = useState([]);
    const [outputNeurons, setOutputNeurons] = useState([]);

    useEffect(()=>{
        const renderIn = [];
        for(let i = 0; i < 400; i++){
            renderIn.push(<div key={i} className="neur"></div>)
        }
        setInputNeurons(renderIn);

        const renderHid = [];
        for(let i = 0; i < 200; i++){
            renderHid.push(<div key={i} className="neur"></div>);
        }
        setHiddenNeurons(renderHid);

        const renderOut = [];
        for(let i = 0; i < 10; i++){
            renderOut.push(<div key={i} className="neur"></div>);
        }
        setOutputNeurons(renderOut);
    }, []);


    useEffect(()=>{
        if(Object.keys(data).length === 0){
            return 1;
        }
        console.log(data)
        const renderIn = [];
        for(let i = 0; i < data.input[0].length; i++){
            renderIn.push(<div key={i} style={{background: data.input[0][i] > 0.5 ? "red" : "blue"}} className="neur"></div>)
        }
        setInputNeurons(renderIn);

        const renderHid = [];
        for(let i = 0; i < data.hidden[0].length; i++){
            renderHid.push(<div key={i} style={{background: data.hidden[0][i] > 0.5 ? "red" : "blue"}} className="neur"></div>);
        }
        setHiddenNeurons(renderHid);

        const renderOut = [];
        for(let i = 0; i < data.output[0].length; i++){
            renderOut.push(<div key={i} style={{background: data.output[0][i] > 0.5 ? "red" : "blue"}} className="neur"></div>);
        }
        setOutputNeurons(renderOut);
    }, [data])

    return (
        <div className="NN">
            <div className="inputN">
                {inputNeurons}
            </div>
            <div className="hiddenN">
                {hiddenNeurons}
            </div>
            <div className="output">
                {outputNeurons}
            </div>
        </div>
    )
}
export default NeuralNetwork;