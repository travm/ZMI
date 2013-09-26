ZMI
===

A JavaScript BMI/MetS Z-Score Calculator


## Getting Started

Simply include zmi.js in your project and include the following form elements in your page.


## Dependencies

- jQuery 1.10.2+
- Moment.JS (For Date/Time Calculation)


## Children API

For Children ZMI will calculate:

- BMI
- BMI Z-Score
- BMI Percentile
- MetS Z-Score
- MetS Percentile

To calculate the children data all of the following fields must exist in your form.

    <input name="[Element Name Here]" />

type
waist
waistUnit
weight
weightUnit
height
heightUnit
birthdate
appointment
gender
race
triglyceride
hdl
sbp
glucose


## Adult API

The Adult calculations are more of a subset of the Child calculations which require the most work. The weight, height, birthdate, and appointment fields are not required in the Adult calculations. For Adults, the only information we will be calculating is the MetS Z-Score and MetS Percentile.

For Adults ZMI will calculate:

- MetS Z-Score
- MetS Percentile

    <input name="[Element Name Here]" />

type
waist
waistUnit
weight
weightUnit
height
heightUnit
gender
race
triglyceride
hdl
sbp
glucose


## Notice

This calculator was created for a grant project based on the work of Matt Gurka and the WVU Health Sciences Center School of Medicine. All MetS Calculations are based on his work and may not apply to certain situations.