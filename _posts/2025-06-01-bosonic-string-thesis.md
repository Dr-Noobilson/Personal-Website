---
layout: post
title: "My MSc Thesis: Quantizing the Bosonic String"
date: 2025-06-01
tags: [physics, string]
excerpt: "A year spent learning why 26 dimensions isn't a guess — it's a theorem. Notes from my master's thesis on bosonic string quantization and conformal field theory."
---

Towards the end of my integrated M.Sc. at NISER, I did my thesis on the quantization of the bosonic string in flat spacetime, supervised by Dr. Shamik Banerjee. Here's a rough tour of what I learned — written the way I wish someone had explained it to me when I started.

## Why Strings?

String theory starts from a simple question: what if the fundamental objects of nature are not point particles but 1-dimensional extended objects (strings)? A point particle traces a worldline; a string traces a **worldsheet** — a 2D surface embedded in $D$-dimensional spacetime.

This tiny change in the fundamental object has enormous consequences for how you quantize the theory.

## The Classical Action

The natural action for a string is the **Nambu-Goto action**, proportional to the worldsheet area:

$$S_{NG} = -T \int d\sigma\, d\tau \sqrt{-\det h_{\alpha\beta}}$$

where $h_{\alpha\beta} = \partial_\alpha X^\mu \partial_\beta X_\mu$ is the induced metric on the worldsheet, $T = \frac{1}{2\pi\alpha'}$ is the string tension, and $X^\mu(\sigma, \tau)$ maps the worldsheet into spacetime.

The square root makes this hard to quantize. The trick is to introduce an auxiliary worldsheet metric $\gamma_{\alpha\beta}$ to get the **Polyakov action**:

$$S_P = -\frac{T}{2} \int d^2\sigma \sqrt{-\gamma}\, \gamma^{\alpha\beta} \partial_\alpha X^\mu \partial_\beta X_\mu$$

This is classically equivalent to $S_{NG}$ (the equation of motion for $\gamma$ sets it equal to $h$), but is quadratic in $X^\mu$ — much more tractable.

The Polyakov action has three local symmetries:
- **Reparametrization invariance** (diffeomorphisms on the worldsheet)
- **Weyl invariance** (local rescaling $\gamma_{\alpha\beta} \to e^{2\omega} \gamma_{\alpha\beta}$)
- **Poincaré invariance** of the target spacetime

Using reparametrization and Weyl invariance, we can fix to the **conformal gauge**: $\gamma_{\alpha\beta} = e^{2\phi} \eta_{\alpha\beta}$, and then further to $\gamma_{\alpha\beta} = \eta_{\alpha\beta}$. The action becomes:

$$S_P = \frac{T}{2} \int d^2\sigma\, (\dot{X}^2 - X'^2)$$

which is just $D$ free scalars on the worldsheet — the wave equation!

## Mode Expansion and Quantization

The general solution (for open strings with Neumann boundary conditions) is:

$$X^\mu(\sigma, \tau) = x^\mu + \frac{\alpha'}{2} p^\mu \tau + i\sqrt{\frac{\alpha'}{2}} \sum_{n \neq 0} \frac{\alpha^\mu_n}{n} e^{-in\tau} \cos(n\sigma)$$

In canonical quantization, the oscillator modes become operators satisfying:

$$[\alpha^\mu_m, \alpha^\nu_n] = m\, \delta_{m+n,0}\, \eta^{\mu\nu}$$

This looks like $D$ copies of the harmonic oscillator algebra. The zero-mode $\alpha_0^\mu \propto p^\mu$ is the center-of-mass momentum.

## The Virasoro Algebra and the Critical Dimension

Conformal invariance after gauge fixing leaves residual symmetry: conformal transformations of the worldsheet. These generate the **Virasoro algebra**. The Virasoro generators are:

$$L_m = \frac{1}{2} \sum_{n \in \mathbb{Z}} \alpha_{m-n} \cdot \alpha_n$$

(with normal ordering for $L_0$). Classically they satisfy $\{L_m, L_n\} = -i(m-n)L_{m+n}$.

Quantum mechanically, normal ordering introduces a **central charge** $c$:

$$[L_m, L_n] = (m-n) L_{m+n} + \frac{c}{12} m(m^2 - 1)\, \delta_{m+n,0}$$

For $D$ free scalars, $c = D$.

Now here's the crux. The physical state conditions require the constraints $L_m |\text{phys}\rangle = 0$ (for $m > 0$) and $(L_0 - a)|\text{phys}\rangle = 0$ where $a$ is the normal ordering constant.

For the theory to be consistent — specifically, for the **No-Ghost Theorem** (all physical states have non-negative norm) to hold — we need:

$$D = 26, \quad a = 1$$

This is the **critical dimension**. It's not a guess or a mystical preference for 26 — it's forced by requiring unitarity of the quantum theory.

The way to see this: the oscillators for timelike directions ($\mu = 0$) have the wrong sign commutator due to $\eta^{00} = -1$, generating negative-norm states ("ghosts"). The central charge of the ghost system arising from BRST quantization is $c_{ghost} = -26$. Anomaly cancellation requires $c_{matter} + c_{ghost} = 0$, giving $D = 26$.

## Mass Spectrum and the Tachyon Problem

The mass-shell condition (from $L_0 = a$) gives:

$$M^2 = \frac{1}{\alpha'}\left(N - a\right) = \frac{1}{\alpha'}(N - 1)$$

where $N = \sum_{n>0} \alpha_{-n} \cdot \alpha_n$ is the level number. At level $N = 0$: $M^2 = -1/\alpha' < 0$ — a **tachyon**, a particle with imaginary mass. This means the bosonic string vacuum is unstable. Superstring theory resolves this by adding fermions (worldsheet supersymmetry), which shifts $a = 1/2$ and eliminates the tachyon.

At level $N = 1$: $M^2 = 0$ — massless vector field. This is where the photon (and graviton, in the closed string) live.

## What I Actually Learned

Beyond the physics, this thesis taught me that conformal field theory is a remarkably self-contained and beautiful structure. The operator product expansion (OPE), radial quantization, and the state-operator correspondence give a completely algebraic handle on 2D field theories that feels fundamentally different from any other QFT approach I'd seen.

And the fact that $D = 26$ emerges purely from consistency requirements — not from experimental input — is genuinely striking. Whether the bosonic string describes nature is another question, but it's a beautiful piece of mathematical physics.
