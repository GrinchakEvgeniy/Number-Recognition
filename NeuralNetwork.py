import numpy as np

# # X = (hours studying, hours sleeping), y = score on test
# x_all = np.array(([2, 9], [1, 5], [3, 6], [5, 10]), dtype=float) # input data
# y = np.array(([92], [86], [89]), dtype=float) # output
#
# # scale units
# x_all = x_all/np.amax(x_all, axis=0) # scaling input data
# y = y/100 # scaling output data (max test score is 100)
#
# # split data
# X = np.split(x_all, [3])[0] # training data
# x_predicted = np.split(x_all, [3])[1] # testing data

class NeuralNetwork(object):

  input_data = []
  hidden_data = []
  output_data = []

  def __init__(self):
  #parameters
    self.inputSize = 400
    self.outputSize = 10
    self.hiddenSize = 200

  #weights
    self.W1 = np.loadtxt('w1.txt')
    self.W2 = np.loadtxt('w2.txt')

    # self.W1 = np.random.randn(self.inputSize, self.hiddenSize)
    # self.W2 = np.random.randn(self.hiddenSize, self.outputSize)

  def forward(self, X):
    self.input_data = X
    self.z = np.dot(X, self.W1)
    self.z2 = self.sigmoid(self.z)
    self.hidden_data = self.z2
    self.z3 = np.dot(self.z2, self.W2)
    o = self.sigmoid(self.z3)
    self.output_data = o
    return o

  def sigmoid(self, s):
    # activation function
    return 1/(1+np.exp(-s))

  def get_data(self):
    return {"input": self.input_data.tolist(), "hidden": self.hidden_data.tolist(), "output": self.output_data.tolist()}

  def sigmoidPrime(self, s):
    #derivative of sigmoid
    return s * (1 - s)

  def backward(self, X, y, o):
    # backward propagate through the network
    self.o_error = y - o # error in output
    self.o_delta = self.o_error*self.sigmoidPrime(o) # applying derivative of sigmoid to error

    self.z2_error = self.o_delta.dot(self.W2.T) # z2 error: how much our hidden layer weights contributed to output error
    self.z2_delta = self.z2_error*self.sigmoidPrime(self.z2) # applying derivative of sigmoid to z2 error

    self.W1 += X.T.dot(self.z2_delta) # adjusting first set (input --> hidden) weights
    self.W2 += self.z2.T.dot(self.o_delta) # adjusting second set (hidden --> output) weights

  def train(self, X, y):
    o = self.forward(X)
    self.backward(X, y, o)

  def saveWeights(self):
    np.savetxt("w1.txt", self.W1, fmt="%s")
    np.savetxt("w2.txt", self.W2, fmt="%s")


# nn = neural_network()
# for i in range(1000): # trains the nn 1,000 times
#   print("# " + str(i) + "\n")
#   print("Input (scaled): \n" + str(X))
#   print("Actual Output: \n" + str(y))
#   print("Predicted Output: \n" + str(nn.forward(X)))
#   print("Loss: \n" + str(np.mean(np.square(y - nn.forward(X))))) # mean squared error
#   print("\n")
#   nn.train(X, y)
#
# nn.saveWeights()
# nn.predict()