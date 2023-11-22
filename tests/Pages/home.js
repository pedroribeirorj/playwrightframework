import { dsl, dynamicXpath } from '../Actions/dsl';
export const modeloDeContratoAluguel = 'para arrendar';
export const modeloDeContratoCompra = 'para comprar';
export const modeloDeContratoFerias = 'para férias';
export const tipologia = {t0:'T0',t1:'T1',t2:'T2',t3:'T3',t4:'T4'};

export class Home{
    
    constructor(page){
        this.page = page;
        this.dsl = new dsl(page);
        ////////////////////////////////////////////////////////////////
        ////////////////////     CONFIGS     //////////////////////////
        //////////////////////////////////////////////////////////////
        this.url            = 'https://www.imovirtual.com/';

        //////////////////////////////////////////////////////////////
        ////////////////////     ROLE     //////////////////////////
        //////////////////////////////////////////////////////////////
        this.role = {
            cookies        : {role : 'button', value : {name:'Aceito'}}, 
            apartamentos   : {role : 'button', value : {name:'Apartamento'}},
            moradias       : {role : 'option', value : {name:'Moradias'}},
            locais         : {porto: { role: 'option', value: {name:'Porto Distrito Expand locations'}},
                                aveiro: {role: 'option',  value: {name:'Aveiro Distrito Expand locations'}},
                                braga:  { role: 'option', value: {name:'Braga Distrito Expand locations'}}},
            gravarPreco     :  {role: 'button', value: {name:'Gravar'}}
        };

        //////////////////////////////////////////////////////////////
        ////////////////////     XPATH     //////////////////////////
        /////////////////////////////////////////////////////////////
       this.xpath = {
            down            : '//label[@id=\'downshift-0-label\']',            
            inputLocal      : '//li/input[@id=\'downshift-0-input\']',  
            modeloDeContrato: '//button[@title=\'para comprar\']',
            menuTipologia   : '//span[text()=\'Tipologia\']',
            preco           : '//input[@name=\'price[max]\']',
            precoMaximo     : '//input[@data-testid=\'price[max]\']',
            listaLocais     : '//div[@class=\'css-asxees\']/ul[@role=\'listbox\']',
            btPreco         : '//button[@aria-label=\'Preço\']',
            pesquisar       :  '//form/div/div[3]/button[@type=\'submit\']'
        }   

        //////////////////////////////////////////////////////////////
        ////////////////////     DYNAMIC XPATH  //////////////////////
        /////////////////////////////////////////////////////////////
        
        this.dynamicXpaths = {
            modeloDeContratoSelecionado : `//li[text()='${dynamicXpath}']`,
            tipologia: `//p[text()='${dynamicXpath}']`
        }

    }

    async pesquisar(){    
        await console.log('[Home] Clicando em pesquisar');
        await this.dsl.click(this.xpath.pesquisar);
    }

    async limparPreco(){
        await console.log('[Home] Limpando campo preço');
        await this.dsl.wait(1000);
        //await this.dsl.click(this.xpath.btPreco);
        await this.dsl.limpar(this.xpath.preco);
    }

    async inserirPrecoMaximo(valor){
        await console.log('[Home] Inserindo valor máximo de arrendamento');
        await this.dsl.click(this.xpath.precoMaximo);
        await this.dsl.input(this.xpath.precoMaximo,valor);
        await this.dsl.clickByRole(this.role.gravarPreco);
        //await this.dsl.wait(1000);
    }

    async selecionarTipologia(list){
        await console.log(`[Home] Inserindo tipologias: ${list}`);
        await this.dsl.click(this.xpath.menuTipologia);
        for(var i=0;i<list.length;i++){
            const xpath = await this.dsl.buildDynamicXpath(this.dynamicXpaths.tipologia, (list[i]).toUpperCase());
            await this.dsl.click(xpath);
        }
    }

    async selecionarModeloDeContrato(modeloDeContratoSelecionado){
      await console.log('[Home] Selecionando modelo de contrato');
      await this.dsl.click(this.xpath.modeloDeContrato);
      const dinXpath = await this.dsl.buildDynamicXpath(this.dynamicXpaths.modeloDeContratoSelecionado, modeloDeContratoSelecionado);
      await this.dsl.click(dinXpath);
    }

    async confirmarOpcoesLocalidade(){
        await this.dsl.click(this.xpath.down);
    }

    async selecionarMoradias(){
        await console.log('[Home] Selecionar tipo de moradia');
        await this.dsl.clickByRole(this.role.apartamentos);    
        await this.dsl.clickByRole(this.role.moradias);
    }

    async goto(){
        await console.log(`[Home] Abrindo url: ${this.url}`);
        await this.dsl.goto(this.url);
    }

    async aceitarCookies(){
        await console.log('[Home] Aceitar cookies');
        await this.dsl.clickByRole(this.role.cookies);
    }

    async clicarEmTexto(texto){
        await this.dsl.clickByText(texto);
    }

    async tirarFocoDoLocal(){
        await this.dsl.click(this.xpath.btPreco);
    }

    async inserirLocais(locais){
        for(const local of locais){
            await this.inserirLocal(local.trim());
        }
    }

    async inserirLocal(local){
        const isVisible = await this.dsl.isVisible(this.xpath.listaLocais);
        if(!isVisible){
            await this.confirmarOpcoesLocalidade();
        }
        await console.log(`[Home] Inserindo localidade: ${local}`);
        switch(local){
            case 'Porto':
                const porto = await this.dsl.getByRoleAndByRoleButton(this.role.locais.porto);
                await porto.click();
                break;
            case 'Aveiro':
                const aveiro = await this.dsl.getByRoleAndByRoleButton(this.role.locais.aveiro);
                await aveiro.click();
                break;
            case 'Braga':
                const braga = await this.dsl.getByRoleAndByRoleButton(this.role.locais.braga);
                await braga.click();
                break;                
        }
            
    }
}