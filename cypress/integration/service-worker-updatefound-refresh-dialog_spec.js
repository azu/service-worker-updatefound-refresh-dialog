describe("service-worker-updatefound-refresh-dialog", () => {
    before(() => {
        cy.visit("/unregister.html");
        cy.wait(1000);
        cy.visit("/register.html");
        cy.wait(1000);
    });
    it("shown dialog and click it", () => {
        cy.visit("/show-dialog.html");
        cy.get(`[data-testid="service-worker-updatefound-refresh-dialog-button"]`).click();
        cy.title().should("eq", "clicked");
    });
    it("support custom message", () => {
        cy.visit("/custom-message.html");
        cy.get(`[data-testid="service-worker-updatefound-refresh-dialog-button"]`).contains("custom message")
    });
});
