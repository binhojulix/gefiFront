"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PendenciaService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../environments/environment");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var apiUrl = environment_1.environment.apiUrl + "/pendencias";
var PendenciaService = /** @class */ (function () {
    function PendenciaService(http) {
        this.http = http;
    }
    //lista todos os Pendencias
    PendenciaService.prototype.getPendencias = function () {
        return this.http.get(apiUrl)
            .pipe(operators_1.tap(function (pendencias) { return console.log('leu os Pendencias'); }), operators_1.catchError(this.handleError('getPendencias', [])));
    };
    PendenciaService.prototype.getPendenciasByControle = function (id_controle) {
        return this.http.get(apiUrl)
            .pipe(operators_1.tap(function (pendencias) { return console.log('leu os Pendencias'); }), operators_1.catchError(this.handleError('getPendencias', [])));
    };
    PendenciaService.prototype.getPendenciasDoUsuario = function () {
        return this.http.get(apiUrl)
            .pipe(operators_1.tap(function (pendencias) { return console.log('leu as Pendencias'); }), operators_1.catchError(this.handleError('getPendenciasDoUsuario', [])));
    };
    PendenciaService.prototype.getPendenciasDaArea = function () {
        return this.http.get(apiUrl)
            .pipe(operators_1.tap(function (pendencias) { return console.log('leu as Pendencias'); }), operators_1.catchError(this.handleError('getPendenciaDaArea', [])));
    };
    PendenciaService.prototype.getPendencia = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("leu a Pendencia id=" + id); }), operators_1.catchError(this.handleError("getPendencia id=" + id)));
    };
    //adiciona um novo Pendencia
    PendenciaService.prototype.addPendencia = function (pendencia) {
        return this.http.post(apiUrl, pendencia, httpOptions).pipe(
        // tslint:disable-next-line:no-shadowed-variable
        operators_1.tap(function (pendencia) { return console.log("adicionou a Pendencia"); }), operators_1.catchError(this.handleError('addPendencia')));
    };
    //atualiza um Pendencia
    PendenciaService.prototype.updatePendencia = function (pendencia) {
        var url = apiUrl + "/" + pendencia.id;
        return this.http.put(url, pendencia, httpOptions).pipe(operators_1.tap(function (_) { return console.log("atualiza o Pendencia"); }), operators_1.catchError(this.handleError('updatePendencia')));
    };
    //deleta Pendencia
    PendenciaService.prototype.deletePendencia = function (id) {
        var url = apiUrl + "/delete/" + id;
        return this.http["delete"](url, httpOptions).pipe(operators_1.tap(function (_) { return console.log("remove Pendencia"); }), operators_1.catchError(this.handleError('deletePendencia')));
    };
    PendenciaService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(error);
            return rxjs_1.of(result);
        };
    };
    PendenciaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PendenciaService);
    return PendenciaService;
}());
exports.PendenciaService = PendenciaService;
