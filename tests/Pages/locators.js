

const url            = 'https://www.imovirtual.com/';

//////////////////////////////////////////////////////////////
////////////////////     ROLE     //////////////////////////
//////////////////////////////////////////////////////////////
const role = {
    cookies        : {role : 'button', value : {name:'Aceito'}}, 
    apartamentos   : {role : 'button', value : {name:'Apartamento'}},
    moradias       : {role : 'option', value : {name:'Moradias'}},
    locais         : {porto: { role: 'option', value: {name:'Porto Distrito Expand locations'}},
                        aveiro: {role: 'option',  value: {name:'Aveiro Distrito Expand locations'}},
                        braga:  { role: 'option', value: {name:'Braga Distrito Expand locations'}}},
    gravarPreco     :  {role: 'button', value: {name:'Gravar'}},
    pesquisar       :  {role: 'button', value: {name:'Pesquisar'}}
};


//////////////////////////////////////////////////////////////
////////////////////     XPATH     //////////////////////////
/////////////////////////////////////////////////////////////
const xpath = {
    down            : '//form/div[1]/div[2]/div/input',            
    modeloDeContrato: '//button[@title=\'para comprar\']',
    menuTipologia   : '//span[text()=\'Tipologia\']',
    preco           : '//span[text()=\'Preço\']',
    precoMaximo     : '//input[@data-testid=\'price[max]\']',
    listaLocais     : '//div[@class=\'css-asxees\']/ul[@role=\'listbox\']'
}   

const dynamicXpaths = {
    abc : '//div[@class=\'css-asxees\'][DYNAMIC_XPATH]'
}

//const tag = {    odks : ''}   

    
   
module.exports = {Home};