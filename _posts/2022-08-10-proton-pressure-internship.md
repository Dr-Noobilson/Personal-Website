---
layout: post
title: "The Pressure Inside a Proton: What I Found at IIT Bhilai"
date: 2022-08-10
tags: [physics, quantum]
excerpt: "In 2018, experimentalists extracted the mechanical pressure distribution inside the proton for the first time. Its peak value exceeds neutron star pressures. Here's the model we built to understand it."
---

My first real research experience was the summer of 2022 at IIT Bhilai, working with Prof. Sabyasachi Ghosh's group. The problem: explain the **mechanical pressure distribution inside the proton** using a simple statistical model.

## The Experiment

In 2018, the CLAS collaboration at Jefferson Lab extracted the pressure distribution inside the proton for the first time, via **Deeply Virtual Compton Scattering (DVCS)**. The result was striking:

- A strongly **repulsive core** inside $r \approx 0.6$ fm
- A peak pressure around $r \approx 0.2$ fm
- Peak value: $\sim 10^{35}$ Pa

That peak pressure is **larger than the pressure inside a neutron star** ($\sim 10^{34}$ Pa). The proton is about $10^{18}$ times smaller than a neutron star, but the pressures it sustains are comparable or higher. This was surprising even to people in the field.

The pressure distribution is encoded in the **gravitational form factor** of the proton, specifically the $D$-term:

$$p(r) = -\frac{1}{6m} \nabla^2 \int \frac{d^3q}{(2\pi)^3} e^{i\mathbf{q}\cdot\mathbf{r}} D(t)\bigg|_{t = -q^2}$$

## The Problem with First-Principles QCD

The "correct" way to compute this is non-perturbative QCD — lattice calculations. But at the time (and still today) these calculations had significant uncertainties and couldn't cleanly reproduce all features of the experimental distribution.

The question we asked: can a **simple degenerate quark model** reproduce the qualitative pressure distribution?

## The Degenerate Quark Model

Inside a proton at zero temperature, we treat the quarks as a degenerate Fermi gas — similar to electrons in a neutron star, but for quarks. The Fermi-Dirac distribution at $T = 0$ is a step function:

$$f(\epsilon) = \begin{cases} 1 & \epsilon < \mu \\ 0 & \epsilon > \mu \end{cases}$$

The pressure of a degenerate relativistic quark gas is:

$$P = \frac{g}{24\pi^2} \left[\mu\sqrt{\mu^2 - m^2}(\mu^2 - \frac{5}{2}m^2) + \frac{3}{2}m^4 \ln\frac{\mu + \sqrt{\mu^2 - m^2}}{m}\right]$$

For ultra-relativistic quarks ($m \to 0$):

$$P = \frac{g\mu^4}{24\pi^2}$$

where $g$ is the degeneracy factor (color $\times$ flavor: $g = 2 N_c N_f = 6$ for $u, d$ quarks).

## The Key Idea: Radial-Dependent Chemical Potential

The trick our model introduced: instead of a uniform chemical potential, we use a **radially dependent** $\mu(r)$, treating it as a tuning parameter to match the experimental pressure distribution.

Physically, this captures (in an effective way) the position-dependent interaction strength from the complex three-body quark potential + gluon field. The quarks are not a uniform gas — the effective chemical potential varies with distance from the proton center.

By choosing:
$$\mu(r) = \mu_0 \left(1 - \frac{r}{R_0}\right)^{1/4}$$

(with $\mu_0$ and $R_0$ fitted to the experimental data) we reproduce:
- The strongly repulsive inner core ($r < 0.6$ fm, $P > 0$)
- The sign change around $0.6$ fm
- The confining tail ($P < 0$ for large $r$, ensuring mechanical stability: $\int_0^\infty P(r) r^2 dr = 0$)

## What This Taught Me

This was my first experience of the loop between **experiment → theory → model**. The experiment gives you a clean target; first-principles theory is too hard; you build a model that captures the essential physics and matches the data.

The degenerate quark model is clearly not the final word — it ignores gluon pressure, assumes a simplified quark picture, and sweeps a lot of strong-force complexity into $\mu(r)$. But it reproduces the qualitative features and gives intuition for why the proton is so mechanically stiff.

The work was presented at the **DAE Symposium on Nuclear Physics, Vol. 67 (2023)**, with me acknowledged as a contributor.

## Fun Fact

The fact that $P_{\rm proton}^{\rm peak} > P_{\rm neutron\ star}$ has a simple explanation once you think about it: pressure scales with energy density / length scale. The energy density inside a proton is $\sim 1\ \text{GeV/fm}^3$, while a neutron star is $\sim \text{MeV/fm}^3$ — three orders of magnitude smaller. The proton is denser per unit volume at its core. The surface gravity of a neutron star is what makes its pressures interesting at astrophysical scales, not its energy density.
