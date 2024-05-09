interface ComplexNumber {
  real: number;
  imaginary: number;
}

// 複素数オブジェクトの足し算を行う
// (a + bi) + (c + di) = (a + c) + (b + d)i
export function add(
  complex1: ComplexNumber,
  complex2: ComplexNumber
): ComplexNumber {
  return {
    real: complex1.real + complex2.real,
    imaginary: complex1.imaginary + complex2.imaginary,
  };
}

// 複素数オブジェクトの引き算を行う
// (a + bi) - (c + di) = (a - c) + (b - d)i
export function sub(complex1: ComplexNumber, complex2: ComplexNumber) {
  return {
    real: complex1.real - complex2.real,
    imaginary: complex1.imaginary - complex2.imaginary,
  };
}

// 複素数オブジェクトのかけ算を行う
// (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
export function mul(complex1: ComplexNumber, complex2: ComplexNumber) {
  return {
    real:
      complex1.real * complex2.real - complex1.imaginary * complex2.imaginary,
    imaginary:
      complex1.real * complex2.imaginary + complex1.imaginary * complex2.real,
  };
}

// 複素数オブジェクトの割り算を行う
// (a + bi) / (c + di) = (ac + bd) / (c^2 + d^2) + (bc - ad) / c^2 + d^2
export function div(complex1: ComplexNumber, complex2: ComplexNumber) {
  return {
    real:
      (complex1.real * complex2.real +
        complex1.imaginary * complex2.imaginary) /
      (complex2.real * complex2.real + complex2.imaginary * complex2.imaginary),
    imaginary:
      (complex1.imaginary * complex2.real -
        complex1.real * complex2.imaginary) /
      (complex2.real * complex2.real + complex2.imaginary * complex2.imaginary),
  };
}
