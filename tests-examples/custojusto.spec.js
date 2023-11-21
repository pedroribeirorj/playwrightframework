import { test, expect } from '@playwright/test';

var enderecos = [];
var enderecosETempos = [];

test('Coleta Links e Enderecos', async ({ page }) => {
  await page.goto('https://www.custojusto.pt/viana-do-castelo/imobiliario/moradias-arrendar');
  await page.getByRole('button', { name: 'Aceitar e fechar: Aceitar o nosso processamento de dados e fechar' }).click();
  await page.getByText('Arrendar', { exact: true }).click();
  await page.locator('select[name="pe"]').selectOption('9');
  await page.locator('select[name="roe"]').selectOption('9');
  await page.locator('select[name="ros"]').selectOption('4');
  await page.locator('select[name="tse"]').selectOption('4');
  await getLinksEEnderecos(page);

  await page.goto('https://www.custojusto.pt/aveiro/imobiliario/moradias-arrendar');
  await page.getByText('Arrendar', { exact: true }).click();
  await page.locator('select[name="pe"]').selectOption('9');
  await page.locator('select[name="roe"]').selectOption('9');
  await page.locator('select[name="ros"]').selectOption('4');
  await page.locator('select[name="tse"]').selectOption('4');
  await getLinksEEnderecos(page);

  await page.goto('https://www.custojusto.pt/porto/imobiliario/moradias-arrendar');
  await page.getByText('Arrendar', { exact: true }).click();
  await page.locator('select[name="pe"]').selectOption('9');
  await page.locator('select[name="roe"]').selectOption('9');
  await page.locator('select[name="ros"]').selectOption('4');
  await page.locator('select[name="tse"]').selectOption('4');
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
    const objNumOfertas =  await page.textContent('(//div[@class=\'col-md-12 hidden-xs\']//small)[1]');
    const numOfertas = objNumOfertas.trim();
    var xpath = '';
    for(var i=1; i<=numOfertas; i++){
        xpath = '(//div[@class=\'container_related\']/a)[' + i + ']';
        var obj = await page.locator(xpath);
        obj = await obj.getAttribute('href');
        
        
        xpath = '(//div[@style=\'text-align: left;\']/span[2])['+i+']';
        var obj2 = await page.textContent(xpath);
        obj2 = (obj2.substring(3,obj2.length)).trim();
        obj2 = obj2.replace(' - ', ', ');
        
        xpath = '(//div[@class=\'container_related\']/a/div[1]/div[2]/h5)['+i+']';
        var obj3 = await page.textContent(xpath);
        obj3 = obj3.replaceAll('\n','');
        obj3 = obj3.trim();
        obj3 = obj3.replace('Renda mensal','');
        
        enderecos.push({obj, obj2, obj3});    
    } 
    //console.log(enderecos);
}