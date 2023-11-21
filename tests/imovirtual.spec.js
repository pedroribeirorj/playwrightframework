import { test, expect, chromium, browser } from '@playwright/test';
import { Home, modeloDeContratoAluguel, tipologia } from './Pages/home';
import fs from 'fs';
import path from 'path';
//npm install csv-parse
import { parse } from 'csv-parse/sync';

var enderecos = [];
var enderecosETempos = [];
const records = parse(fs.readFileSync(path.join(__dirname, '../massa.csv')), {
  columns: true,
  delimiter: ';',
  trim: true,
  skip_empty_lines: true
});

test.beforeEach(async ({page}) => {
    page.on("console", msg =>{
        if(msg.type == 'error' || msg.type == 'info')
            console.log(msg.text());
    });
});

for (const data of records) {
    if(data.teste = 'Coleta Links e Enderecos'){        
        const tipologia = data.tipologia.split(',');
        const locais = data.localidade.split(',');

        test('Coleta Links e Enderecos', async ({ page }) => {
            const home = new Home(page);
            await home.goto();
            await home.aceitarCookies();
            await home.selecionarMoradias();  
            await home.clicarEmTexto('Procure por uma localização');
            await home.inserirLocais(locais); 
            await home.tirarFocoDoLocal();
            await home.limparPreco();
            await home.inserirPrecoMaximo(data.preco_maximo);

            await home.selecionarModeloDeContrato(modeloDeContratoAluguel);
            await home.selecionarTipologia(tipologia);
            
            await home.pesquisar();
        });
    }
}

test.skip('Pesquisa Gmaps', async ({ page }) => {
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
    const objNumOfertas =  await page.textContent('//div[contains(.,\'Número de ofertas:\')]/strong');
    const numOfertas = objNumOfertas.trim();
    var xpath = '';
    for(var i=1; i<=numOfertas; i++){
        xpath = '(//article/div/header/h3/a)[' + i + ']';
        var obj = await page.locator(xpath);
        obj = await obj.getAttribute('href');
        
        
        xpath = '(//article//p)['+i+']';
        var obj2 = await page.textContent(xpath);
        obj2 = obj2.replace('Moradia para arrendar:', '');

        xpath = '(//article/div[1]/ul/li[2])['+i+']';
        var obj3 = await page.textContent(xpath);
        obj3 = obj3.replaceAll('\n','');
        obj3 = obj3.replaceAll('  ', '');

        enderecos.push({obj, obj2, obj3});        
    } 
   // console.log(enderecos);
}