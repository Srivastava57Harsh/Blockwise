const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SplitPayments", function () {
  let SplitPayments;
  let splitPayments;
  let owner, payer;

  beforeEach(async function () {
    [owner, payer] = await ethers.getSigners();

    // Deploy SplitPayments contract
    SplitPayments = await ethers.getContractFactory("SplitPayments");
    splitPayments = await SplitPayments.connect(owner).deploy();
  });

  it("should deploy with the correct owner", async function () {
    expect(await splitPayments.owner()).to.equal(owner.address);
  });

  it("should add an expense correctly", async function () {
    const amount = ethers.parseEther("1.0");

    await splitPayments.connect(payer).addExpense({ value: amount });

    expect(await splitPayments.getBalance(payer.address)).to.equal(amount);
    expect(await splitPayments.getTotalBalance()).to.equal(amount);
  });

  it("should not add an expense with zero value", async function () {
    await expect(splitPayments.connect(payer).addExpense({ value: 0 }))
      .to.be.revertedWith("Expense amount must be greater than 0");
  });

  it("should settle an expense correctly", async function () {
    const amount = ethers.parseEther("1.0");
    await splitPayments.connect(payer).addExpense({ value: amount });

    await splitPayments.connect(owner).settleExpense(payer.address);

    expect(await splitPayments.getBalance(payer.address)).to.equal(0);
    expect(await splitPayments.getTotalBalance()).to.equal(0);
  });

  it("should not settle an expense with payee having no outstanding balance", async function () {
    await expect(splitPayments.connect(owner).settleExpense(payer.address))
      .to.be.revertedWith("Payee has no outstanding balance");
  });

  it("should not settle an expense by non-owner", async function () {
    const amount = ethers.parseEther("1.0");
    await splitPayments.connect(payer).addExpense({ value: amount });

    await expect(splitPayments.connect(payer).settleExpense(payer.address))
      .to.be.revertedWith("Only the owner can call this function");
  });

  it("should return correct balance and total balance", async function () {
    const amount = ethers.parseEther("1.5");
    await splitPayments.connect(payer).addExpense({ value: amount });

    expect(await splitPayments.getBalance(payer.address)).to.equal(amount);
    expect(await splitPayments.getTotalBalance()).to.equal(amount);

    await splitPayments.connect(owner).settleExpense(payer.address);

    expect(await splitPayments.getBalance(payer.address)).to.equal(0);
    expect(await splitPayments.getTotalBalance()).to.equal(0);
  });
});
