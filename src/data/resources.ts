import { Resource } from "./types";

export const resources: Resource[] = [
  // 📚 Books
  {
    id: "book-nielsen-chuang",
    title: "Quantum Computation and Quantum Information",
    description:
      "The definitive textbook on quantum computing. Covers quantum circuits, algorithms, error correction, and information theory with mathematical rigor.",
    url: "https://www.cambridge.org/9781107002173",
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "Michael A. Nielsen & Isaac L. Chuang",
    domain: "Both",
  },
  {
    id: "book-shankar",
    title: "Principles of Quantum Mechanics",
    description:
      "A comprehensive graduate-level introduction to quantum mechanics, covering wavefunctions, operators, perturbation theory, and scattering.",
    url: "https://www.springer.com/9780306447907",
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "Ramamurti Shankar",
    domain: "Quantum Mechanics",
  },
  {
    id: "book-griffiths",
    title: "Introduction to Quantum Mechanics",
    description:
      "The standard undergraduate textbook for quantum mechanics. Clear explanations of the Schrödinger equation, spin, and identical particles.",
    url: "https://www.cambridge.org/9781107189638",
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "David J. Griffiths",
    domain: "Quantum Mechanics",
  },
  {
    id: "book-sakurai",
    title: "Modern Quantum Mechanics",
    description:
      "A rigorous yet accessible graduate text covering state vectors, angular momentum, approximation methods, and relativistic quantum mechanics.",
    url: "https://www.cambridge.org/9781108422413",
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "J.J. Sakurai & Jim Napolitano",
    domain: "Quantum Mechanics",
  },
  {
    id: "book-kaye-laflamme-mosca",
    title: "An Introduction to Quantum Computing",
    description:
      "A practical introduction covering quantum gates, algorithms, physical implementations, and the computational advantages of quantum systems.",
    url: "https://www.amazon.com/Introduction-Quantum-Computing-Phillip-Kaye/dp/019857049X",
    tags: ["BOOK", "TUT"],
    category: "Book",
    author: "Phillip Kaye, Raymond Laflamme & Michele Mosca",
    domain: "Quantum Computing",
  },
  {
    id: "book-mermin",
    title: "Quantum Computer Science: An Introduction",
    description:
      "An accessible introduction to quantum computing by a renowned physicist, covering circuits, algorithms, and the basics of quantum information.",
    url: "https://www.cambridge.org/9780521876582",
    tags: ["BOOK", "TUT"],
    category: "Book",
    author: "N. David Mermin",
    domain: "Quantum Computing",
  },
  {
    id: "book-preskill-notes",
    title: "Lecture Notes on Quantum Information",
    description:
      "John Preskill's famous lecture notes covering quantum entanglement, quantum Shannon theory, and quantum error correction.",
    url: "https://theory.caltech.edu/people/preskill/ph229/",
    tags: ["BOOK", "NOTES", "GUIDE"],
    category: "Book",
    author: "John Preskill",
    domain: "Both",
  },
  {
    id: "book-yanofsky-mannucci",
    title: "Quantum Computing for Computer Scientists",
    description:
      "Bridges the gap between computer science and quantum mechanics. Covers linear algebra, quantum algorithms, and complexity theory.",
    url: "https://www.cambridge.org/9780521879965",
    tags: ["BOOK", "TUT"],
    category: "Book",
    author: "Noson S. Yanofsky & Mirco A. Mannucci",
    domain: "Quantum Computing",
  },
  {
    id: "book-wilde",
    title: "Quantum Information Theory",
    description:
      "A comprehensive treatment of quantum information theory, including entropy, channel capacity, and quantum error correction.",
    url: "https://www.cambridge.org/9781316809976",
    tags: ["BOOK", "GUIDE", "PAPER"],
    category: "Book",
    author: "Mark M. Wilde",
    domain: "Both",
  },
  // 🎓 Courses
  {
    id: "course-qiskit-summer-school",
    title: "Qiskit Summer School",
    description:
      "IBM's annual quantum computing summer school. Covers quantum gates, algorithms, error mitigation, and hands-on Qiskit programming.",
    url: "https://qiskit.org/learn/summer-school/",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    domain: "Quantum Computing",
  },
  {
    id: "course-mit-804",
    title: "MIT 8.04: Quantum Physics I",
    description:
      "MIT's undergraduate quantum mechanics course covering wave mechanics, the Schrödinger equation, and the uncertainty principle.",
    url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    domain: "Quantum Mechanics",
  },
  {
    id: "course-mit-805",
    title: "MIT 8.05: Quantum Physics II",
    description:
      "Covers quantum mechanics in greater depth: angular momentum, spin, perturbation theory, and identical particles.",
    url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    domain: "Quantum Mechanics",
  },
  {
    id: "course-caltech-quantum-mechanics",
    title: "Caltech Ph 125: Quantum Mechanics",
    description:
      "Caltech's graduate-level quantum mechanics course taught by John Preskill. Covers foundations through advanced topics.",
    url: "https://theory.caltech.edu/people/preskill/ph125/",
    tags: ["COURSE", "NOTES", "VIDEO"],
    category: "Course",
    author: "John Preskill",
    domain: "Quantum Mechanics",
  },
  {
    id: "course-quantum-computing-ucsd",
    title: "CSE 291: Quantum Computing (UCSD)",
    description:
      "Graduate course covering quantum algorithms, complexity theory, and quantum information. Taught by Scott Aaronson.",
    url: "https://www.scottaaronson.com/qclec/",
    tags: ["COURSE", "NOTES"],
    category: "Course",
    author: "Scott Aaronson",
    domain: "Quantum Computing",
  },
  {
    id: "course-quantum-information-berkeley",
    title: "Berkeley CS 294: Quantum Information & Computation",
    description:
      "Advanced course covering quantum algorithms, quantum Shannon theory, and quantum cryptography.",
    url: "https://inst.eecs.berkeley.edu/~cs294-2/fa24/",
    tags: ["COURSE", "NOTES"],
    category: "Course",
    domain: "Quantum Computing",
  },
  {
    id: "course-edx-quantum-mechanics",
    title: "MITx: Quantum Mechanics (8.04x)",
    description:
      "An online version of MIT's quantum mechanics course with interactive problem sets and video lectures.",
    url: "https://www.edx.org/course/quantum-mechanics",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    domain: "Quantum Mechanics",
  },
  // 📺 Video Playlists
  {
    id: "video-3b1b-qc",
    title: "Quantum Computing Playlist",
    description:
      "A visually intuitive introduction to quantum computing concepts by 3Blue1Brown, including qubits, superposition, and quantum gates.",
    url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDOy9FfjMNK9G6vGXF8w06vD",
    tags: ["VIDEO", "TUT"],
    category: "Video Playlist",
    author: "3Blue1Brown (Grant Sanderson)",
    domain: "Both",
  },
  {
    id: "video-qiskit-youtube",
    title: "Qiskit YouTube Channel",
    description:
      "Extensive video library covering quantum computing tutorials, Qiskit coding sessions, and quantum research discussions.",
    url: "https://www.youtube.com/@qiskit",
    tags: ["VIDEO", "TUT"],
    category: "Video Playlist",
    domain: "Quantum Computing",
  },
  {
    id: "video-minutephysics-qc",
    title: "MinutePhysics: Quantum Computing",
    description:
      "Short, engaging videos explaining quantum computing concepts from superposition to quantum error correction.",
    url: "https://www.youtube.com/playlist?list=PLJ7SgSNq3s5S1t8iZjEG0eOnlQf1I0QqY",
    tags: ["VIDEO", "TUT"],
    category: "Video Playlist",
    author: "MinutePhysics (Henry Reich)",
    domain: "Both",
  },
  {
    id: "video-perez-gisbert-qml",
    title: "Quantum Machine Learning Lectures",
    description:
      "Maria Schuld's lecture series on quantum machine learning, covering variational algorithms, kernel methods, and QML theory.",
    url: "https://www.youtube.com/playlist?list=PLmRxgFnCI9e_5t1tlcbqMhGgkVsJXRcJ",
    tags: ["VIDEO", "COURSE"],
    category: "Video Playlist",
    domain: "Quantum Computing",
  },
  {
    id: "video-institute-qc",
    title: "Institute for Quantum Computing Lectures",
    description:
      "Research-level lectures from the University of Waterloo's IQC, covering topological quantum computing, error correction, and quantum information.",
    url: "https://www.youtube.com/@IQCUniversityofWaterloo",
    tags: ["VIDEO", "COURSE", "PAPER"],
    category: "Video Playlist",
    domain: "Both",
  },
  {
    id: "video-google-qc-symposium",
    title: "Google Quantum AI Symposium",
    description:
      "Recordings from Google's annual Quantum AI symposium featuring research talks on quantum supremacy, error correction, and quantum hardware.",
    url: "https://www.youtube.com/playlist?list=PLFZ2DvU9e1DEZ-J-Qqbs5b8iL8zlNrlzR",
    tags: ["VIDEO", "PAPER"],
    category: "Video Playlist",
    domain: "Quantum Computing",
  },
  // 🖥️ Platforms
  {
    id: "platform-ibm-quantum",
    title: "IBM Quantum Experience",
    description:
      "Cloud-based quantum computing platform. Access real IBM quantum processors, run circuits, and use the Qiskit SDK.",
    url: "https://quantum-computing.ibm.com/",
    tags: ["PLATFORM", "GUIDE"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-amazon-braket",
    title: "Amazon Braket",
    description:
      "AWS-managed quantum computing service with access to IonQ, Rigetti, and D-Wave hardware. Features hybrid quantum-classical workflows.",
    url: "https://aws.amazon.com/braket/",
    tags: ["PLATFORM", "GUIDE"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-google-quantum-ai",
    title: "Google Quantum AI",
    description:
      "Google's quantum computing research platform featuring the Sycamore processor and Cirq SDK. Pioneered quantum supremacy demonstrations.",
    url: "https://quantumai.google/",
    tags: ["PLATFORM", "GUIDE", "PAPER"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-microsoft-quantum",
    title: "Microsoft Quantum (Azure Quantum)",
    description:
      "Full-stack quantum cloud platform with Q# programming language, resource estimation, and access to ion-trap and topological qubit hardware.",
    url: "https://azure.microsoft.com/en-us/products/quantum/",
    tags: ["PLATFORM", "GUIDE"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-pennylane",
    title: "PennyLane",
    description:
      "Cross-platform quantum machine learning library with automatic differentiation, integration with PyTorch, TensorFlow, and JAX.",
    url: "https://pennylane.ai/",
    tags: ["PLATFORM", "GUIDE", "TUT"],
    category: "Platform",
    domain: "Quantum Computing",
  },
];
