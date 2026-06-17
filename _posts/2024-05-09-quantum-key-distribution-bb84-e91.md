---
layout: post
title: "Quantum Cryptography: How BB84 and E91 Actually Work"
date: 2024-05-09
tags: [quantum, physics]
excerpt: "Classical cryptography is doomed the day a large enough quantum computer turns on. Here's how BB84 and E91 offer a way out — grounded in the physics, not just the buzzwords."
---

Shor's algorithm is one of those results that sounds alarming in headlines ("quantum computers can break all encryption!") and tends to get immediately misrepresented. So let me be precise about what the threat is, and then explain how quantum key distribution (QKD) addresses it — not by being quantum-harder to break, but by making eavesdropping *physically detectable*.

## The Actual Threat to Classical Cryptography

RSA encryption relies on the computational hardness of factoring large integers. Given $N = p \cdot q$ where $p, q$ are large primes, classical algorithms take roughly $\mathcal{O}(e^{(\log N)^{1/3}})$ time — superpolynomial in the key size. This is the hardness assumption.

Shor's algorithm (1994) factors $N$ in $\mathcal{O}((\log N)^3)$ time on a quantum computer by exploiting **quantum parallelism and the quantum Fourier transform**. The key subroutine is period-finding: given $f(x) = a^x \mod N$, find its period $r$. Once you have $r$, with high probability $\gcd(a^{r/2} \pm 1, N)$ gives a non-trivial factor.

The quantum speedup comes from the fact that a quantum register can evaluate $f(x)$ for all $x$ simultaneously in superposition, then the QFT extracts the period from the resulting interference pattern.

So yes — RSA is dead once large-scale fault-tolerant quantum computers exist. The same applies to elliptic-curve Diffie-Hellman (via the discrete logarithm variant of Shor's algorithm).

## The QKD Philosophy

QKD doesn't try to be computationally hard. Instead it uses **quantum mechanics itself** as a security guarantee. The key idea: you cannot measure an unknown quantum state without disturbing it. Any eavesdropper (Eve) necessarily leaves traces, which Alice and Bob can detect.

This is physical security, not computational security. It holds regardless of Eve's computing power.

## BB84 Protocol

BB84 (Bennett & Brassard, 1984) uses photon polarization in two conjugate bases:

- **Rectilinear basis** $\{|0\rangle, |1\rangle\}$: horizontal/vertical polarization
- **Diagonal basis** $\{|+\rangle, |-\rangle\}$: $45°/135°$ polarization

where $|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$ and $|-\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)$.

**Protocol steps:**

1. **Alice** randomly chooses a bit ($0$ or $1$) and a basis (rectilinear or diagonal), encodes, and sends the photon.
2. **Bob** randomly chooses a measurement basis.
3. **Sifting**: Alice and Bob publicly reveal which bases they used (not the bits). They keep only the bits where bases matched — roughly 50% of cases. This is the *raw key*.
4. **Error estimation**: They sacrifice a small subset of the raw key to estimate the quantum bit error rate (QBER).
5. **Privacy amplification + error correction** produce the final secret key.

**Security argument**: If Eve intercepts a photon and measures it in the wrong basis (50% probability), she collapses the state and resends a new photon. This introduces errors detectable in step 4. If QBER exceeds a threshold (~11% for individual attacks), the protocol aborts.

The information-theoretic security proof shows that Eve's information about the final key can be made exponentially small via privacy amplification.

## E91 Protocol

E91 (Ekert, 1991) is more beautiful, in my opinion. It uses **entangled photon pairs** in the singlet state:

$$|\Psi^-\rangle = \frac{1}{\sqrt{2}}\bigl(|01\rangle - |10\rangle\bigr)$$

Alice and Bob each receive one photon of each pair from a central source. They measure in randomly chosen bases from overlapping but not identical sets. Security is guaranteed by the **Bell-CHSH inequality**:

$$S = |E(a,b) - E(a,b') + E(a',b) + E(a',b')| \leq 2$$

where $E(a,b)$ is the correlation when Alice measures at angle $a$ and Bob at $b$. For the singlet state with optimal angles, $S = 2\sqrt{2} \approx 2.83$, violating the classical bound.

**The key point**: if Eve is entangled with the photons (i.e., is eavesdropping), she breaks the entanglement between Alice and Bob, reducing $S$ toward 2. So checking for Bell inequality violation *is* the security test.

Bits where Alice and Bob used the same basis are kept as the key; bits where they used complementary bases are used to compute $S$.

## Implementation

For my course project I implemented both protocols in Python using Qiskit (for quantum circuit simulation) and Flask (to simulate the network layer across devices). A few things that were non-obvious:

- Qiskit's statevector simulator is exact but slow for large circuits; the QASM simulator introduces shot noise you actually want for BB84 QBER estimation.
- Implementing realistic channel noise (depolarizing + amplitude damping) exposed how quickly QBER climbs under even mild decoherence.
- E91 required careful handling of the measurement angle parametrization to correctly compute correlators.

The code is on [GitHub (QKD_Protocols)](https://github.com/Dr-Noobilson/QKD_Protocols).

## Post-Quantum Alternatives

QKD requires a quantum channel (fiber or free-space optics) which is expensive to deploy. The NIST post-quantum cryptography standardization process (finalized 2024) offers a complementary path: lattice-based algorithms like CRYSTALS-Kyber and CRYSTALS-Dilithium that remain hard even for quantum computers. These run on classical hardware.

The future likely uses both: QKD for high-security point-to-point links, and post-quantum algorithms everywhere else.
