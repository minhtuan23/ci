import { pageFixture } from "../utils/pageFixture";

export default class LoginPage{

    private Elements = {
        user_loc: "//input[@name='username']",
        password_loc: "//input[@name='password']",
        submit_loc: "//button[@type='submit']",
        error_message: "//span[text()='Required']"
    }

    async enterUserName(user: string){
        await pageFixture.page!.locator(this.Elements.user_loc).fill(user)
        console.log("providing username")
    }

    async enterPasswrod(password: string){
        await pageFixture.page!.locator(this.Elements.password_loc).fill(password)
        console.log("providing password")
    }

    async submit(){
        await pageFixture.page!.locator(this.Elements.submit_loc).click()
        console.log("clicking submit button")
    }

    async enterUserNameAndPassword(user: string, password: string){
        await this.enterUserName(user)
        await this.enterPasswrod(password)
    }

    async getDashboardTitle(): Promise<string> {
        const actualTitle = await pageFixture.page!.title();
        return actualTitle;
    }

  async getFieldErrorMessages(): Promise<string[]> {
    const messages = pageFixture.page!.locator(this.Elements.error_message);
    const count = await messages.count();
    const results: string[] = [];

    for (let i = 0; i < count; i++) {
      results.push(await messages.nth(i).innerText());
    }

    return results;
  }
}