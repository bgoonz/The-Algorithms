package Mathematics

import org.scalatest.FlatSpec

class PrimeFactorsSpec extends FlatSpec {

  "PrimeFactorsSpec 1" should "output the correct list of all the prime factors of a number" in {
    assert(PrimeFactors.primeFactors(80) === List(2, 2, 2, 2, 5))
  }

}
