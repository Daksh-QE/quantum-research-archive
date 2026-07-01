export interface Snippet {
  id: string;
  title: string;
  framework: string;   // Qiskit | PennyLane | Cirq
  level: "beginner" | "intermediate";
  explanation: string;
  code: string;
  sandbox?: string;    // optional ?circuit=... deep-link into the Quantum Sandbox
}

/* Short, self-contained example programs. Written in-house; standard textbook
   circuits. Where a circuit is expressible in the visual Sandbox, a deep-link
   lets you open and run it there. */
export const snippets: Snippet[] = [
  {
    id: "snip-super",
    title: "Superposition — a single Hadamard",
    framework: "Qiskit",
    level: "beginner",
    explanation: "One H gate puts a qubit into an equal 50/50 superposition. Measured many times, you get roughly half 0s and half 1s.",
    code: `from qiskit import QuantumCircuit
from qiskit_aer import Aer

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)

sim = Aer.get_backend("aer_simulator")
print(sim.run(qc, shots=1000).result().get_counts())`,
    sandbox: "H0",
  },
  {
    id: "snip-bell",
    title: "Bell state — entangle two qubits",
    framework: "Qiskit",
    level: "beginner",
    explanation: "H then CNOT creates (|00⟩+|11⟩)/√2. The two qubits are entangled: measuring one instantly determines the other, so you only ever see 00 or 11.",
    code: `from qiskit import QuantumCircuit
from qiskit_aer import Aer

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

sim = Aer.get_backend("aer_simulator")
print(sim.run(qc, shots=1000).result().get_counts())`,
    sandbox: "H0-CX0,1",
  },
  {
    id: "snip-ghz",
    title: "GHZ state — three-way entanglement",
    framework: "Qiskit",
    level: "beginner",
    explanation: "Extending the Bell recipe with a second CNOT entangles all three qubits into (|000⟩+|111⟩)/√2.",
    code: `from qiskit import QuantumCircuit

qc = QuantumCircuit(3, 3)
qc.h(0)
qc.cx(0, 1)
qc.cx(1, 2)
qc.measure(range(3), range(3))`,
    sandbox: "H0-CX0,1-CX1,2",
  },
  {
    id: "snip-grover",
    title: "Grover search (2 qubits, mark |11⟩)",
    framework: "Qiskit",
    level: "intermediate",
    explanation: "One Grover iteration on 2 qubits finds the marked state with certainty: an oracle (CZ) flips the phase of |11⟩, then a diffusion operator amplifies it.",
    code: `from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 2)
qc.h([0, 1])
qc.cz(0, 1)              # oracle: mark |11>
qc.h([0, 1]); qc.z([0, 1]); qc.cz(0, 1); qc.h([0, 1])  # diffusion
qc.measure([0, 1], [0, 1])  # -> 11 with prob 1`,
  },
  {
    id: "snip-pennylane",
    title: "Bell state + expectation value (PennyLane)",
    framework: "PennyLane",
    level: "beginner",
    explanation: "PennyLane wraps circuits as differentiable functions. Here we build a Bell pair and read out ⟨Z⟩ on the first qubit (0 for a maximally-entangled qubit).",
    code: `import pennylane as qml

dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def bell():
    qml.Hadamard(0)
    qml.CNOT(wires=[0, 1])
    return qml.expval(qml.PauliZ(0))

print(bell())   # ~0.0`,
  },
  {
    id: "snip-cirq",
    title: "Bell state (Cirq)",
    framework: "Cirq",
    level: "beginner",
    explanation: "The same Bell circuit in Google's Cirq, simulated with its built-in state-vector simulator.",
    code: `import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit([cirq.H(q0), cirq.CNOT(q0, q1), cirq.measure(q0, q1)])
print(cirq.Simulator().run(circuit, repetitions=1000).histogram(key="0,1"))`,
  },
];
