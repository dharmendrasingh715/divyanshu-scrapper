describe('template spec', () => {
  it('passes', () => {
    let bigArr = [];
    cy.visit('https://www.worlddata.info/asia/afghanistan/earthquakes.php');
    cy.get('#earthquakes').find('tr').each(($el, index) => {
      if(index === 0) {
        let keyArr = [];
        cy.wrap($el).find('th').each(($el1) => {
          keyArr.push($el1.text())
        });
        bigArr.push(keyArr);
      } else {
        let valArr = []
        cy.wrap($el).find('td').each(($el2) => {
          valArr.push($el2.text())
        });
        bigArr.push(valArr);
      }
    })
    console.log(bigArr);
    let bigObjArr = [];
    cy.wrap(bigArr).each((el, index) => {
      let obj = {};
      if(index!== 0) {
        cy.wrap(el).each((el2, index2) => {
          obj[bigArr[0][index2]] = el2 || 'no data'
        });
        bigObjArr.push(obj);
      }
    });
    cy.writeFile('data.json', bigObjArr);
  })
})