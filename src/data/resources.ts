import { Resource } from "./types";

export const resources: Resource[] = [
  // ===== 📚 Books =====
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
    title: "Lecture Notes on Quantum Information (Ph 219)",
    description:
      "John Preskill's famous Caltech Ph 219 lecture notes covering quantum entanglement, quantum Shannon theory, and quantum error correction.",
    url: "http://theory.caltech.edu/~preskill/ph229/",
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
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "Mark M. Wilde",
    domain: "Both",
  },
  {
    id: "book-nakahara",
    title: "Quantum Computing: From Linear Algebra to Physical Realizations",
    description:
      "A comprehensive text bridging mathematical foundations with practical quantum computing implementations and physical realizations.",
    url: "https://www.crcpress.com/9780750309837",
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "Mikio Nakahara",
    domain: "Quantum Computing",
  },
  {
    id: "book-rieffel-polak",
    title: "Quantum Computing: A Gentle Introduction",
    description:
      "A thorough yet accessible introduction to quantum computing requiring minimal physics background. Covers circuits, algorithms, and quantum information theory.",
    url: "https://mitpress.mit.edu/9780262526678/",
    tags: ["BOOK", "TUT"],
    category: "Book",
    author: "Eleanor Rieffel & Wolfgang Polak",
    domain: "Quantum Computing",
  },
  {
    id: "book-sutor",
    title: "Dancing with Qubits",
    description:
      "An intuitive and hands-on guide to quantum computing that builds understanding from basic quantum mechanics through to advanced algorithms.",
    url: "https://www.packtpub.com/product/dancing-with-qubits/9781838827366",
    tags: ["BOOK", "TUT"],
    category: "Book",
    author: "Robert S. Sutor",
    domain: "Quantum Computing",
  },
  {
    id: "book-benenti",
    title: "Principles of Quantum Computation and Information",
    description:
      "A comprehensive two-volume set covering both the foundations of quantum computation and advanced topics in quantum information processing.",
    url: "https://www.amazon.com/Principles-Quantum-Computation-Information-Vol/dp/9812388303",
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "Giuliano Benenti, Giulio Casati & Giuliano Strini",
    domain: "Quantum Computing",
  },
  {
    id: "book-mcmahon",
    title: "Quantum Computing Explained",
    description:
      "A clear, self-contained introduction to quantum computing that explains key concepts with minimal mathematics.",
    url: "https://www.wiley.com/en-us/Quantum+Computing+Explained-p-9780470096994",
    tags: ["BOOK", "TUT"],
    category: "Book",
    author: "David McMahon",
    domain: "Quantum Computing",
  },
  {
    id: "book-desurvire",
    title: "Classical and Quantum Information Theory",
    description:
      "A comprehensive treatment of information theory covering both classical Shannon theory and quantum information theory.",
    url: "https://www.cambridge.org/9780521881715",
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "Emmanuel Desurvire",
    domain: "Both",
  },
  {
    id: "book-zettili",
    title: "Quantum Mechanics: Concepts and Applications",
    description:
      "A comprehensive textbook bridging conceptual understanding with practical problem-solving in quantum mechanics.",
    url: "https://www.wiley.com/en-us/Quantum+Mechanics%3A+Concepts+and+Applications-p-9780470026793",
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "N. Zettili",
    domain: "Quantum Mechanics",
  },
  {
    id: "book-mcintyre",
    title: "Quantum Mechanics: A Paradigms Approach",
    description:
      "A modern approach to teaching quantum mechanics using a paradigms-based methodology, emphasizing conceptual understanding.",
    url: "https://www.amazon.com/Quantum-Mechanics-Paradigms-David-McIntyre/dp/0321765796",
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "David H. McIntyre",
    domain: "Quantum Mechanics",
  },
  {
    id: "book-hidary",
    title: "Quantum Computing: An Applied Approach",
    description:
      "A practical guide to quantum computing covering both theory and hands-on implementation with modern quantum computing frameworks.",
    url: "https://link.springer.com/book/10.1007/978-3-030-23922-0",
    tags: ["BOOK", "TUT", "GUIDE"],
    category: "Book",
    author: "Jack D. Hidary",
    domain: "Quantum Computing",
  },
  {
    id: "book-kaiser-granade",
    title: "Learn Quantum Computing with Python and Q#",
    description:
      "A hands-on introduction to quantum computing using Python and Microsoft's Q# language, with practical examples and exercises.",
    url: "https://www.manning.com/books/learn-quantum-computing-with-python-and-q-sharp",
    tags: ["BOOK", "TUT"],
    category: "Book",
    author: "Sarah C. Kaiser & Cassandra Granade",
    domain: "Quantum Computing",
  },
  {
    id: "book-vos",
    title: "Quantum Computing in Action",
    description:
      "A practical guide to implementing quantum algorithms using Java and the Strangeworks platform, focusing on real-world applications.",
    url: "https://www.manning.com/books/quantum-computing-in-action",
    tags: ["BOOK", "TUT"],
    category: "Book",
    author: "Johan Vos",
    domain: "Quantum Computing",
  },
  {
    id: "book-lalooe",
    title: "Do We Really Understand Quantum Mechanics?",
    description:
      "A critical examination of the foundations and interpretations of quantum mechanics, exploring conceptual puzzles and paradoxes.",
    url: "https://www.cambridge.org/9781108417068",
    tags: ["BOOK", "GUIDE"],
    category: "Book",
    author: "Franck Laloë",
    domain: "Quantum Mechanics",
  },
  {
    id: "book-wong",
    title: "Introduction to Classical and Quantum Computing",
    description:
      "A textbook designed for undergraduate computer science students, covering both classical and quantum computing paradigms.",
    url: "https://www.thomaswong.net/introduction-to-classical-and-quantum-computing/",
    tags: ["BOOK", "TUT"],
    category: "Book",
    author: "Thomas G. Wong",
    domain: "Quantum Computing",
  },
  {
    id: "book-williams",
    title: "Explorations in Quantum Computing",
    description:
      "A project-based introduction to quantum computing with exercises in quantum algorithms, cryptography, and error correction.",
    url: "https://link.springer.com/book/10.1007/978-1-84628-887-6",
    tags: ["BOOK", "TUT"],
    category: "Book",
    author: "Colin P. Williams",
    domain: "Quantum Computing",
  },

  // ===== 🎓 Courses =====
  {
    id: "course-qiskit-summer-school",
    title: "Qiskit Summer School",
    description:
      "IBM's annual quantum computing summer school. Covers quantum gates, algorithms, error mitigation, and hands-on Qiskit programming.",
    url: "https://learning.quantum.ibm.com/",
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
    title: "Caltech Ph 219: Quantum Computation",
    description:
      "Caltech's graduate-level quantum information and computation course taught by John Preskill. Covers quantum error correction, entanglement, and quantum Shannon theory.",
    url: "http://theory.caltech.edu/~preskill/ph229/",
    tags: ["COURSE", "NOTES", "VIDEO"],
    category: "Course",
    author: "John Preskill",
    domain: "Quantum Mechanics",
  },
  {
    id: "course-quantum-computing-ucsd",
    title: "Scott Aaronson: Introduction to Quantum Information Science (UT Austin)",
    description:
      "Scott Aaronson's lecture notes for his graduate quantum information science course at UT Austin, covering qubits, quantum algorithms, and complexity.",
    url: "https://www.scottaaronson.com/qclec.pdf",
    tags: ["COURSE", "NOTES"],
    category: "Course",
    author: "Scott Aaronson (UT Austin)",
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
  {
    id: "course-coursera-quantum-computing",
    title: "edX: Quantum Information Science I (MITx 8.370.x)",
    description:
      "MITx's introduction to quantum information science on edX, taught by Isaac Chuang, Aram Harrow, and Peter Shor — qubits, gates, and core quantum algorithms.",
    url: "https://openlearninglibrary.mit.edu/courses/course-v1:MITx+8.370.1x+1T2018/about",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    author: "MITx (Isaac Chuang et al.)",
    domain: "Quantum Computing",
  },
  {
    id: "course-coursera-quantum-cryptography",
    title: "edX: Quantum Cryptography (Caltech & Delft)",
    description:
      "An advanced edX course on quantum cryptography from Caltech and TU Delft, taught by Stephanie Wehner and Umesh Vazirani, covering QKD, entanglement-based protocols, and security proofs.",
    url: "https://www.edx.org/learn/quantum-computing/delft-university-of-technology-quantum-computing",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    author: "Stephanie Wehner & Umesh Vazirani (Caltech/Delft)",
    domain: "Quantum Computing",
  },
  {
    id: "course-edx-quantum-fundamentals",
    title: "edX: Quantum Mechanics for Everyone",
    description:
      "A conceptual introduction to quantum mechanics from Georgetown University, requiring no advanced math background.",
    url: "https://www.edx.org/learn/quantum-physics-mechanics/georgetown-university-quantum-mechanics-for-everyone",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    author: "Georgetown University",
    domain: "Quantum Mechanics",
  },
  {
    id: "course-stanford-susskind-qm",
    title: "Stanford: The Theoretical Minimum — Quantum Mechanics",
    description:
      "Leonard Susskind's acclaimed lecture series on quantum mechanics from Stanford, part of the Theoretical Minimum program.",
    url: "https://theoreticalminimum.com/courses/quantum-mechanics/2012/winter",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    author: "Leonard Susskind",
    domain: "Quantum Mechanics",
  },
  {
    id: "course-qiskit-summer-school-2023",
    title: "Qiskit Global Summer School 2023: Quantum Computing",
    description:
      "IBM's 2023 global summer school covering quantum algorithms, error mitigation, and hands-on Qiskit exercises.",
    url: "https://learning.quantum.ibm.com/",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    domain: "Quantum Computing",
  },
  {
    id: "course-brilliant-qc",
    title: "Brilliant: Quantum Computing Track",
    description:
      "An interactive, hands-on introduction to quantum computing concepts through puzzles, visualizations, and guided exercises.",
    url: "https://brilliant.org/courses/quantum-computing/",
    tags: ["COURSE", "TUT", "INTERACTIVE"],
    category: "Course",
    domain: "Quantum Computing",
  },
  {
    id: "course-qubit-by-qubit",
    title: "Qubit by Qubit: Introduction to Quantum Computing",
    description:
      "A comprehensive year-long quantum computing course by The Coding School, covering foundations through advanced topics with live instruction.",
    url: "https://www.thecodingschool.com/qubitbyqubit",
    tags: ["COURSE", "VIDEO", "TUT"],
    category: "Course",
    domain: "Quantum Computing",
  },
  {
    id: "course-nptel-quantum-computing",
    title: "NPTEL: Quantum Computing — Theory to Simulation",
    description:
      "A comprehensive course from IIT on quantum computing covering quantum gates, algorithms, and quantum simulation techniques.",
    url: "https://nptel.ac.in/courses/115101092",
    tags: ["COURSE", "NOTES", "VIDEO"],
    category: "Course",
    domain: "Quantum Computing",
  },
  {
    id: "course-mit-806",
    title: "MIT 8.06: Quantum Physics III",
    description:
      "MIT's third undergraduate quantum course covering perturbation theory, scattering, and relativistic quantum mechanics.",
    url: "https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    domain: "Quantum Mechanics",
  },
  {
    id: "course-ibm-quantum-learning",
    title: "IBM Quantum Learning",
    description:
      "IBM Quantum's official learning platform with interactive courses, tutorials, and certification paths for quantum computing.",
    url: "https://learning.quantum.ibm.com/",
    tags: ["COURSE", "TUT", "GUIDE"],
    category: "Course",
    domain: "Quantum Computing",
  },
  {
    id: "course-grovers-algorithm-course",
    title: "Quantum Algorithm Design (EdX)",
    description:
      "A deep dive into quantum algorithm design from TU Delft, covering Grover, Shor, and quantum Fourier transform.",
    url: "https://www.edx.org/learn/computer-programming/delft-university-of-technology-quantum-algorithms-and-error-correction",
    tags: ["COURSE", "VIDEO"],
    category: "Course",
    domain: "Quantum Computing",
  },

  // ===== 📺 Video Playlists =====
  {
    id: "video-3b1b-qc",
    title: "3Blue1Brown: Quantum-Related Videos",
    description:
      "Collection of videos from 3Blue1Brown touching on quantum concepts — Bell's inequality, Schrödinger's equation, and quantum mechanics visualizations.",
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
    id: "video-pennylane-qml",
    title: "PennyLane: Quantum Machine Learning Demos & Lectures",
    description:
      "Xanadu's PennyLane quantum machine learning channel and demos, covering variational algorithms, kernel methods, and QML theory (work by Maria Schuld and colleagues).",
    url: "https://www.youtube.com/@PennyLaneAI",
    tags: ["VIDEO", "COURSE"],
    category: "Video Playlist",
    author: "PennyLane / Xanadu (Maria Schuld et al.)",
    domain: "Quantum Computing",
  },
  {
    id: "video-institute-qc",
    title: "Institute for Quantum Computing Lectures",
    description:
      "Research-level lectures from the University of Waterloo's IQC, covering topological quantum computing, error correction, and quantum information.",
    url: "https://www.youtube.com/@InstituteForQuantumComputing",
    tags: ["VIDEO", "COURSE"],
    category: "Video Playlist",
    domain: "Both",
  },
  {
    id: "video-google-qc-symposium",
    title: "Google Quantum AI YouTube Channel",
    description:
      "Research talks and explainers from Google Quantum AI on quantum supremacy, error correction, and quantum hardware.",
    url: "https://www.youtube.com/@GoogleQuantumAI",
    tags: ["VIDEO", "PAPER"],
    category: "Video Playlist",
    domain: "Quantum Computing",
  },
  {
    id: "video-prof-m-does-science-qm",
    title: "Quantum Mechanics by Professor M does Science",
    description:
      "A thorough series on quantum mechanics fundamentals, from wavefunctions to perturbation theory, with clear mathematical derivations.",
    url: "https://www.youtube.com/playlist?list=PL8W2boV7Hf1qVwWJYn0uT1DBzNmvI8I8p",
    tags: ["VIDEO", "COURSE"],
    category: "Video Playlist",
    author: "Professor M does Science",
    domain: "Quantum Mechanics",
  },
  {
    id: "video-pbs-space-time-qm",
    title: "PBS Space Time: Quantum Physics Playlist",
    description:
      "In-depth explorations of quantum physics concepts from the PBS Space Time channel, covering black holes, entanglement, and quantum fields.",
    url: "https://www.youtube.com/playlist?list=PLsPUh22kYmNCGAQx7tB9wH3cTq0o0o3hF",
    tags: ["VIDEO", "GUIDE"],
    category: "Video Playlist",
    author: "PBS Space Time",
    domain: "Both",
  },
  {
    id: "video-sabine-hossenfelder",
    title: "Sabine Hossenfelder: Quantum Physics Explained",
    description:
      "Clear, critical explanations of quantum mechanics and quantum computing by physicist Sabine Hossenfelder, making complex topics accessible.",
    url: "https://www.youtube.com/@SabineHossenfelder",
    tags: ["VIDEO", "GUIDE"],
    category: "Video Playlist",
    author: "Sabine Hossenfelder",
    domain: "Both",
  },
  {
    id: "video-looking-glass-universe",
    title: "Looking Glass Universe: Quantum Mechanics",
    description:
      "Friendly, visual explanations of quantum mechanics concepts aimed at making quantum physics intuitive and accessible.",
    url: "https://www.youtube.com/@LookingGlassUniverse",
    tags: ["VIDEO", "TUT"],
    category: "Video Playlist",
    author: "Looking Glass Universe",
    domain: "Quantum Mechanics",
  },
  {
    id: "video-domain-of-science-quantum",
    title: "Domain of Science: Quantum Computing Explainers",
    description:
      "Quantum computing and quantum mechanics explainer videos from Domain of Science, covering QC fundamentals with clear visual maps.",
    url: "https://www.youtube.com/@domainofscience",
    tags: ["VIDEO", "TUT", "GUIDE"],
    category: "Video Playlist",
    author: "Domain of Science (Dominic Walliman)",
    domain: "Both",
  },
  {
    id: "video-ryan-odonnell-qm",
    title: "Ryan O'Donnell: Quantum Computation and Information (CMU)",
    description:
      "Ryan O'Donnell's CMU lecture course on quantum computation and information, aimed at computer scientists. Full video lectures and notes via his CMU page.",
    url: "https://www.cs.cmu.edu/~odonnell/",
    tags: ["VIDEO", "COURSE"],
    category: "Video Playlist",
    author: "Ryan O'Donnell",
    domain: "Both",
  },
  {
    id: "video-john-watrous-qis",
    title: "John Watrous: Introduction to Quantum Information Science",
    description:
      "Graduate-level lecture series on quantum information theory by John Watrous, covering quantum channels, entropy, and capacity.",
    url: "https://www.youtube.com/watch?v=k0P6l0nQD5A",
    tags: ["VIDEO", "COURSE", "PAPER"],
    category: "Video Lecture",
    author: "John Watrous",
    domain: "Quantum Computing",
  },
  {
    id: "video-microsoft-quantum",
    title: "Microsoft Quantum Development Kit Tutorials",
    description:
      "Official tutorials from Microsoft on quantum programming with Q#, including quantum algorithms and Azure Quantum.",
    url: "https://learn.microsoft.com/en-us/azure/quantum/",
    tags: ["GUIDE", "TUT"],
    category: "Video Playlist",
    author: "Microsoft Quantum",
    domain: "Quantum Computing",
  },
  {
    id: "video-eugene-k-quantum",
    title: "Physics Videos by Eugene Khutoryansky",
    description:
      "Clear and detailed video explanations of quantum mechanics concepts, from basic principles to advanced topics.",
    url: "https://www.youtube.com/@EugeneKhutoryansky",
    tags: ["VIDEO", "TUT"],
    category: "Video Playlist",
    author: "Eugene Khutoryansky",
    domain: "Quantum Mechanics",
  },
  {
    id: "video-veritasium-quantum",
    title: "Veritasium: Quantum Physics Videos",
    description:
      "Popular science videos exploring quantum mechanics phenomena, including quantum entanglement, measurement, and quantum computing.",
    url: "https://www.youtube.com/@veritasium",
    tags: ["VIDEO", "GUIDE"],
    category: "Video Playlist",
    author: "Veritasium (Derek Muller)",
    domain: "Both",
  },
  {
    id: "video-qutech-academy",
    title: "QuTech Academy: Quantum Computing Lectures",
    description:
      "Educational video series from QuTech in the Netherlands, covering quantum computing fundamentals and quantum internet concepts.",
    url: "https://www.youtube.com/@QuTechAcademy",
    tags: ["VIDEO", "COURSE"],
    category: "Video Playlist",
    author: "QuTech Academy",
    domain: "Quantum Computing",
  },
  {
    id: "video-qosf-seminars",
    title: "QOSF: Quantum Open Source Foundation Talks",
    description:
      "Recorded talks and seminars from the Quantum Open Source Foundation, covering open-source quantum computing projects and research.",
    url: "https://www.youtube.com/@unitaryfund",
    tags: ["VIDEO", "TUT", "PAPER"],
    category: "Video Playlist",
    author: "QOSF",
    domain: "Quantum Computing",
  },
  {
    id: "video-cirq-tutorials",
    title: "Google Cirq: Documentation & Tutorials",
    description:
      "Official Google Cirq tutorials covering quantum circuit design, noise simulation, and running circuits on quantum processors.",
    url: "https://quantumai.google/cirq/tutorials",
    tags: ["VIDEO", "TUT"],
    category: "Video Playlist",
    author: "Google Quantum AI",
    domain: "Quantum Computing",
  },
  {
    id: "video-sean-carroll-qm",
    title: "Sean Carroll's Biggest Ideas: Quantum Mechanics",
    description:
      "Sean Carroll's comprehensive lecture series on quantum mechanics, covering the foundations, interpretations, and modern developments.",
    url: "https://www.youtube.com/playlist?list=PLrxfgDEc2NxZJcWZgMMUx-aUFqBq6M5hB",
    tags: ["VIDEO", "COURSE", "GUIDE"],
    category: "Video Playlist",
    author: "Sean Carroll",
    domain: "Quantum Mechanics",
  },
  // ===== 🖥️ Platforms =====
  {
    id: "platform-ibm-quantum",
    title: "IBM Quantum Experience",
    description:
      "Cloud-based quantum computing platform. Access real IBM quantum processors, run circuits, and use the Qiskit SDK.",
    url: "https://quantum.ibm.com/",
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
    title: "PennyLane (Cloud & Learning Platform)",
    description:
      "Xanadu's PennyLane web platform: hosted QML demos, the Codebook interactive course, datasets, and cloud access to quantum devices. (For the SDK itself, see the Tools section.)",
    url: "https://pennylane.ai/qml/",
    tags: ["PLATFORM", "GUIDE", "TUT"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-xanadu-cloud",
    title: "Xanadu Quantum Cloud",
    description:
      "Cloud access to Xanadu's photonic quantum computers via the PennyLane framework. Specializes in continuous-variable quantum computing and QML.",
    url: "https://cloud.xanadu.ai/",
    tags: ["PLATFORM", "GUIDE"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-ionq-cloud",
    title: "IonQ Quantum Cloud",
    description:
      "Cloud access to IonQ's trapped-ion quantum computers, available through AWS Braket, Azure Quantum, and direct API access.",
    url: "https://ionq.com/quantum-cloud",
    tags: ["PLATFORM", "GUIDE"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-dwave-leap",
    title: "D-Wave Leap",
    description:
      "Cloud platform for D-Wave's quantum annealers and hybrid solvers. Access quantum annealing systems for optimization problems.",
    url: "https://www.dwavesys.com/",
    tags: ["PLATFORM", "GUIDE"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-strangeworks",
    title: "Strangeworks QC Platform",
    description:
      "A cloud-agnostic quantum computing platform that provides access to multiple hardware backends through a unified interface.",
    url: "https://strangeworks.com/",
    tags: ["PLATFORM", "GUIDE"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-classiq",
    title: "Classiq Quantum Platform",
    description:
      "A quantum algorithm design platform that automatically optimizes quantum circuits from high-level functional descriptions.",
    url: "https://www.classiq.io/",
    tags: ["PLATFORM", "GUIDE", "TUT"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-quantinuum",
    title: "Quantinuum (Honeywell Quantum Solutions)",
    description:
      "Integrated quantum computing platform featuring Honeywell's trapped-ion hardware and the TKET quantum SDK for circuit optimization.",
    url: "https://www.quantinuum.com/",
    tags: ["PLATFORM", "GUIDE", "PAPER"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-oxford-quantum",
    title: "Oxford Quantum Circuits (OQC)",
    description:
      "UK-based quantum cloud platform providing access to superconducting quantum computers via OQC's Coaxmon architecture.",
    url: "https://oxfordquantumcircuits.com/",
    tags: ["PLATFORM", "GUIDE"],
    category: "Platform",
    domain: "Quantum Computing",
  },
  {
    id: "platform-quilc-rigetti",
    title: "Rigetti Quantum Cloud Services",
    description:
      "Full-stack quantum cloud platform with access to Rigetti's superconducting processors, the Quil instruction set, and the Forest SDK.",
    url: "https://www.rigetti.com/",
    tags: ["PLATFORM", "GUIDE"],
    category: "Platform",
    domain: "Quantum Computing",
  },

  // ===== 🔬 Research Guides & References =====
  {
    id: "guide-quantum-algorithm-zoo",
    title: "Quantum Algorithm Zoo",
    description:
      "A comprehensive catalog of quantum algorithms maintained by Stephen Jordan, organized by problem domain with references and speedups.",
    url: "https://quantumalgorithmzoo.org/",
    tags: ["GUIDE", "PAPER", "REFERENCE"],
    category: "Research Guide",
    author: "Stephen Jordan",
    domain: "Quantum Computing",
  },
  {
    id: "guide-quantiki",
    title: "Quantiki — Quantum Information Wiki",
    description:
      "A community-maintained wiki for quantum information science, covering concepts, people, institutions, and research topics.",
    url: "https://www.quantiki.org/",
    tags: ["GUIDE", "REFERENCE"],
    category: "Research Guide",
    domain: "Both",
  },
  {
    id: "guide-arxiv-quant-ph",
    title: "arXiv: Quantum Physics (quant-ph)",
    description:
      "The primary preprint repository for quantum physics and quantum computing research. Access the latest papers and foundational works.",
    url: "https://arxiv.org/list/quant-ph/recent",
    tags: ["PAPER", "REFERENCE", "RESEARCH"],
    category: "Research Guide",
    domain: "Both",
  },
  {
    id: "guide-quantum-computing-report",
    title: "Quantum Computing Report",
    description:
      "A curated directory and news source tracking the quantum computing industry, including hardware, software, and company profiles.",
    url: "https://quantumcomputingreport.com/",
    tags: ["GUIDE", "NEWS", "REFERENCE"],
    category: "Research Guide",
    domain: "Quantum Computing",
  },
  {
    id: "guide-qiskit-tutorials",
    title: "Qiskit Tutorials and Educational Resources",
    description:
      "IBM's comprehensive collection of Jupyter notebook tutorials covering quantum computing concepts with hands-on Qiskit exercises.",
    url: "https://learning.quantum.ibm.com/",
    tags: ["TUT", "GUIDE", "INTERACTIVE"],
    category: "Research Guide",
    domain: "Quantum Computing",
  },
  {
    id: "guide-quantum-internet",
    title: "Quantum Internet and Quantum Networks Resource Guide",
    description:
      "A collection of resources on quantum networking, quantum repeaters, and the emerging quantum internet from QuTech.",
    url: "https://www.qutech.nl/quantum-internet/",
    tags: ["GUIDE", "PAPER", "RESEARCH"],
    category: "Research Guide",
    domain: "Quantum Computing",
  },
  {
    id: "guide-qworld",
    title: "QWorld: Quantum Computing Educational Resources",
    description:
      "A global community-driven platform offering quantum computing workshops, tutorials, and educational materials in multiple languages.",
    url: "https://qworld.net/",
    tags: ["GUIDE", "TUT", "INTERACTIVE"],
    category: "Research Guide",
    domain: "Quantum Computing",
  },
  {
    id: "guide-quantum-quest",
    title: "Quantum Quest: Interactive Quantum Computing",
    description:
      "An interactive platform for learning quantum computing through visual circuit builders, challenges, and guided tutorials.",
    url: "https://quantum-quest.nl/",
    tags: ["GUIDE", "TUT", "INTERACTIVE"],
    category: "Research Guide",
    domain: "Quantum Computing",
  },
  {
    id: "guide-nist-qc",
    title: "NIST: Quantum Computing Standards and Research",
    description:
      "National Institute of Standards and Technology resources on quantum computing standards, post-quantum cryptography, and quantum metrology.",
    url: "https://www.nist.gov/quantum-information-science",
    tags: ["GUIDE", "PAPER", "RESEARCH"],
    category: "Research Guide",
    domain: "Both",
  },
];
