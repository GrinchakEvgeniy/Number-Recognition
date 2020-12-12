import React, {useState, useEffect} from 'react';


const Graphics = ({pred, gate}) => {
    const [renderPredicted, setRenderPredicted] = useState([]);
    const [renderGateway, setRenderGateway] = useState([]);

    const maxIndex = (arr) => {
        let max = arr[0];
        let maxIndex = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
        return maxIndex;
    }

    const getArrFromGate = () => {
        const result = [];
        for(let i = 0; i < 10; i++){
            if(i == gate){
                result.push(0.9);
            } else {
                result.push(0.1);
            }
        }
        return result;
    }

    useEffect(()=>{
        if(Object.keys(pred).length === 0){
            return 1;
        }
        const render_arr_P = [];
        const max_P = maxIndex(pred.output[0]);
        for(let i = 0; i < pred.output[0].length; i++){
            render_arr_P.push(<div className="gr" style={{height: pred.output[0][i].toFixed(5) / pred.output[0][max_P].toFixed(5) * 100 +"%"}}><p>{i}</p></div>)
        }
        setRenderPredicted(render_arr_P);

        const render_arr_G = [];
        const arr_G = getArrFromGate();
        const max_G = maxIndex(arr_G);
        for(let i = 0; i < arr_G.length; i++){
            render_arr_G.push(<div className="gr" style={{height: arr_G[i] / arr_G[max_G] * 100 +"%"}}><p>{i}</p></div>)
        }
        setRenderGateway(render_arr_G);
    }, []);

    useEffect(()=>{
        if(Object.keys(pred).length === 0){
            return 1;
        }
        const render_arr_P = [];
        const max_P = maxIndex(pred.output[0]);
        for(let i = 0; i < pred.output[0].length; i++){
            render_arr_P.push(<div className="gr" style={{height: pred.output[0][i].toFixed(5) / pred.output[0][max_P].toFixed(5) * 100 +"%"}}><p>{i}</p></div>)
        }
        setRenderPredicted(render_arr_P);

        const render_arr_G = [];
        const arr_G = getArrFromGate();
        const max_G = maxIndex(arr_G);
        for(let i = 0; i < arr_G.length; i++){
            render_arr_G.push(<div className="gr" style={{height: arr_G[i] / arr_G[max_G] * 100 +"%"}}><p>{i}</p></div>)
        }
        setRenderGateway(render_arr_G);
    }, [pred]);


    return (
        <div className="graphics">
            <div className="drp_predicted">
                <div className="drp_main">
                    <p className="max_y">Max</p>
                    <p className="zero">0</p>
                    <p className="max_x">Numbers</p>
                    <div className="result_">
                        {renderPredicted}
                    </div>
                </div>
            </div>
            <div className="drp_gateway">
                <div className="drp_main">
                    <p className="max_y">Max</p>
                    <p className="zero">0</p>
                    <p className="max_x">Numbers</p>
                    <div className="result_">
                        {renderGateway}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Graphics;