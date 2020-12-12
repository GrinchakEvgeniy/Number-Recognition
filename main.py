from flask import Flask, render_template, request
import numpy as np
from flask import jsonify
from NeuralNetwork import NeuralNetwork

app = Flask(__name__)

@app.route('/api/', methods=['GET', 'POST'])
def api():
    if request.method == 'POST':
        x_all = np.array(([request.get_json()["data"]]), dtype=float)
        nn = NeuralNetwork()
        if request.get_json()["train"]:
            predict = []
            for i in range(10):
                if i == int(request.get_json()["predict"]):
                    predict.append(0.9)
                else:
                    predict.append(0.1)
            y = np.array((predict), dtype=float)
            print(y)
            nn.train(x_all, y)
            data_tested = nn.get_data()
            nn.saveWeights()
        else:
            nn.forward(x_all)
            data_tested = nn.get_data()
    # return render_template('main.html', name="test")
    return jsonify(data_tested)

@app.route('/')
def main():
    return render_template('main.html', name="test")

if __name__ == '__main__':
    app.run()