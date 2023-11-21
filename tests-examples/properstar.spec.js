import { test, expect } from '@playwright/test';

var enderecos = [];
var enderecosETempos = [];

test('Coleta Links e Enderecos', async ({ page }) => {
  await page.goto('https://www.properstar.pt/portugal/distrito-de-aveiro/alugar/apartamento-casas/1p-quarto?price.max=650');  
 await getLinksEEnderecos(page);

 await page.goto('https://www.properstar.pt/portugal/distrito-de-porto/alugar/apartamento-casas/1p-quarto?price.max=650');  
 await getLinksEEnderecos(page);
 
 await page.goto('https://www.properstar.pt/portugal/distrito-de-braga/alugar/apartamento-casas/1p-quarto?price.max=650');  
 await getLinksEEnderecos(page);
});

test('Pesquisa Gmaps', async ({ page }) => {
    await page.goto('https://www.google.com/maps');
    await page.goto('https://www.google.com/maps/@-22.9249931,-43.2957274,14z?entry=ttu');
    
//    page.on('console', msg => console.log(msg.text()));


    await page.getByRole('textbox', { name: 'Pesquise no Google Maps' }).click();

    await page.getByRole('textbox', { name: 'Pesquise no Google Maps' }).fill('noesis porto');
    await page.getByRole('button', { name: 'Rotas' }).click();

    for(var i=0;i<enderecos.length;i++){
        var link = (enderecos[i].obj);
        var destino = (enderecos[i].obj2);      
        var preco = (enderecos[i].obj3);

        await page.locator('//*[@id=\'sb_ifc50\']/input').fill(destino);
        await page.locator('//*[@id=\'sb_ifc50\']/input').press('Enter');
 //       await page.waitForTimeout(1500);
        await page.waitForSelector('//*[@id=\'omnibox-directions\']/div/div[2]/div/div/div/div[2]/button/div[1]');
        var tempo = await page.textContent('//*[@id=\'omnibox-directions\']/div/div[2]/div/div/div/div[2]/button/div[1]');
        
        enderecosETempos.push({destino, tempo, link, preco});
    }
    console.log(enderecosETempos);


});

async function getLinksEEnderecos(page) {
    /*
    ler todos os registros da página
    se houver proxima pagina,
        acessar proxima pagina
    */
    '//div[@class=\'pagination\']/ul/li[@class=\'page-link next\']';
    
    const objNumOfertas =  await page.textContent('//div[@class=\'total-results\']/span');
    const numOfertas = (objNumOfertas.replace(' resultados','')).trim();
    var xpath = '';
    for(var i=1; i<=numOfertas; i++){
        xpath = '(//div[@class=\'item-data\']/div[1]/a)[' + i + ']';
        var obj = await page.locator(xpath);
        obj =  await obj.getAttribute('href');
        obj = 'http://www.properstar.pt'+ obj;
        
        xpath = '(//div[@class=\'item-location\'])['+i+']';
        var obj2 = await page.textContent(xpath);
       
        //obj2 = obj2.replace('Moradia para arrendar:', '');

        xpath = '(//div[@class=\'listing-price-main\']/span)['+i+']';
        var obj3 = await page.textContent(xpath);
        obj3 = obj3.replaceAll('\n','');
        obj3 = obj3.replaceAll('  ', '');

        enderecos.push({obj, obj2, obj3});        
    } 
 
   // console.log(enderecos);
}