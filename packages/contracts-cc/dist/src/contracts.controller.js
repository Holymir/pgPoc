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
    ContractsController.prototype.create = function (contracts, assignedFor) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contracts.isConfirmed = false;
                        contracts.assignedFor = assignedFor;
                        return [4, contracts.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ContractsController.prototype.confirmContract = function (contractId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contract;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("!!!HERE!!!");
                        console.log(this.sender);
                        console.log(this.tx.identity.getAttributeValue("hf.Affiliation"));
                        console.log(this.tx.identity);
                        return [4, contracts_model_1.Contracts.getOne(contractId)];
                    case 1:
                        contract = _a.sent();
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
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(contracts_model_1.Contracts)),
        tslib_1.__param(1, convector_core_1.Param(yup.string()))
    ], ContractsController.prototype, "create", null);
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], ContractsController.prototype, "confirmContract", null);
    ContractsController = tslib_1.__decorate([
        convector_core_1.Controller('contracts')
    ], ContractsController);
    return ContractsController;
}(convector_core_1.ConvectorController));
exports.ContractsController = ContractsController;
//# sourceMappingURL=contracts.controller.js.map