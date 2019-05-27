"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var convector_core_1 = require("@worldsibu/convector-core");
var yup = require("yup");
var contracts_model_1 = require("./contracts.model");
var ContractsController = (function (_super) {
    tslib_1.__extends(ContractsController, _super);
    function ContractsController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContractsController.prototype.createContract = function (contracts) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contracts.isConfirmed = false;
                        contracts.pngAddress = this.sender;
                        return [4, contracts.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ContractsController.prototype.getContract = function (contractId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, contracts_model_1.Contracts.getOne(contractId).then(function (model) { return model.toJSON(); })];
            });
        });
    };
    ContractsController.prototype.getAllContracts = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, contracts_model_1.Contracts.getAll().then(function (models) { return models.map(function (model) { return model.toJSON(); }); })];
            });
        });
    };
    ContractsController.prototype.confirmContract = function (contractId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contract;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, contracts_model_1.Contracts.getOne(contractId)];
                    case 1:
                        contract = _a.sent();
                        if (this.sender == contract.pngAddress) {
                            throw new Error("Confirming your own contacts is not allowed");
                        }
                        if (this.tx.identity.getAttributeValue("hf.Affiliation") !== contract.assignedFor) {
                            throw new Error("Your organisation \"" + this.tx.identity.getAttributeValue("hf.Affiliation") + "\" is not allowed to sign this contract ");
                        }
                        contract.isConfirmed = true;
                        return [4, contract.save()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ContractsController.prototype.declineContract = function (contractId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contract;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, contracts_model_1.Contracts.getOne(contractId)];
                    case 1:
                        contract = _a.sent();
                        contract.isConfirmed = false;
                        return [4, contract.save()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ContractsController.prototype.invokeClaim = function (claim) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contractID, contract;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractID = claim.contractID;
                        return [4, contracts_model_1.Contracts.getOne(contractID)];
                    case 1:
                        contract = _a.sent();
                        if (contract.isConfirmed) {
                            throw new Error("Contract " + contract.name + " is approved");
                        }
                        if (contract.endDate < Date.now()) {
                            throw new Error("Contract " + contract.name + " is outdated");
                        }
                        if (contract.claimAmount != claim.amount) {
                            claim.isApproved = true;
                        }
                        return [4, claim.save()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ContractsController.prototype.getClaim = function (claimID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, contracts_model_1.Claim.getOne(claimID).then(function (model) { return model.toJSON(); })];
            });
        });
    };
    ContractsController.prototype.getAllClaims = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, contracts_model_1.Claim.getAll().then(function (models) { return models.map(function (model) { return model.toJSON(); }); })];
            });
        });
    };
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(contracts_model_1.Contracts))
    ], ContractsController.prototype, "createContract", null);
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], ContractsController.prototype, "getContract", null);
    tslib_1.__decorate([
        convector_core_1.Invokable()
    ], ContractsController.prototype, "getAllContracts", null);
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], ContractsController.prototype, "confirmContract", null);
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], ContractsController.prototype, "declineContract", null);
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(contracts_model_1.Claim))
    ], ContractsController.prototype, "invokeClaim", null);
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], ContractsController.prototype, "getClaim", null);
    tslib_1.__decorate([
        convector_core_1.Invokable()
    ], ContractsController.prototype, "getAllClaims", null);
    ContractsController = tslib_1.__decorate([
        convector_core_1.Controller('contracts')
    ], ContractsController);
    return ContractsController;
}(convector_core_1.ConvectorController));
exports.ContractsController = ContractsController;
//# sourceMappingURL=contracts.controller.js.map