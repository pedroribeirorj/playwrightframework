export const dynamicXpath='[DYNAMIC_XPATH]';
export class dsl{
    constructor(page){
        this.page = page;
    }

    //actions
    async goto(url){
        await this.page.goto(url);
    }

    async wait(time){
        await this.page.waitForTimeout(time);
    }

    async isVisible(obj) {
        try{
            let element = await this.getByXpath(obj);
            await element.waitFor({ state: 'visible' ,timeout:1000});
            const value = await element.isVisible();
            return value;
        }
         catch(exception_var){
            return false;
         }
    }

    async exists(obj) {
        const elem = this.page.locator(obj);
        return elem.length > 0;
    }

    //keys
    async pressEsc(obj){
        await this.page.locator(obj).click();
        await this.page.locator(obj).press('Esc');
    }

    async pressKey(locator, key){
        await this.page.getByText(locator).press(key);
    }

    //GET
    async getByXpath(xpath){
        return await this.page.locator(xpath);
    }
    async getById(id){
        return await this.page.getById(id);
    }

    async getByRole(obj){
        return await this.page.getByRole(obj.role, obj.value);
    }

    async getByRoleAndByRoleButton(obj){
        //const elem
        return await this.page.getByRole(obj.role, obj.value).getByRole('button');
    }

    //CLICK
    async click(obj, type=''){
       // [TODA IMPLEMENTAÇÃO GENÉRICA PARA CLICKS]
        if(type == ''){
            await this.page.locator(obj).click();
            return;
        }
        switch (type) {
            case 'text':
                await clickByText(obj);
                break;
            case 'role':
                await clickByRole(obj);
                break;
            default:
                break;
        }
    }

    async clickByText(texto){
        await this.page.getByText(texto).click();

    }

    async clickByRole(obj){
        await this.page.getByRole(obj.role, obj.value).click();
    }

    async limpar(obj){
        await this.input(obj,'');
    }

    //input
    async input(obj, text){
        await this.page.locator(obj).fill(text);
    }

    async buildDynamicXpath(xpath, option){
        return await xpath.replace(dynamicXpath, option);
    }
}