var expect = require('chai').expect;
var func = require('../src/utils/timeblock')
var moment = require('moment')

describe('测试timeblock.js', function() {
  describe('测试countTimeBlockWithScale函数', function() {
    it('相同时间 计算结果为1', function() {
      expect(func.countTimeBlockWithScale(moment(
          '2018-10-10 10:00:00'), moment('2018-10-10 10:00:00'), ))
        .to.be.equal(1);
    });

    it('参数值非moment 类型报错', function() {
      expect(() => func.countTimeBlockWithScale(new Date(
          '2018-10-10 10:00:00'), moment('2018-10-10 10:00:00'),
        11)).to.throw('参数必须为moment 对象');
    });

    it('start 在 end 之后 报错', function() {
      expect(() => func.countTimeBlockWithScale(moment(
          '2018-10-12 10:00:00'), moment('2018-10-10 10:00:00'),
        11)).to.throw('错误的参数顺序');
    });

    it('数据测试1', function() {
      expect(func.countTimeBlockWithScale(moment(
          '2018-10-10 10:00:00'), moment('2018-10-10 11:00:00'),
        10)).to.equal(7)
    });

    it('数据测试2', function() {
      expect(func.countTimeBlockWithScale(moment(
          '2018-10-10 00:00:00'), moment('2018-10-10 11:00:00'),
        60)).to.equal(12)
    });

    it('数据测试3', function() {
      expect(func.countTimeBlockWithScale(moment(
          '2018-10-10 10:00:00'), moment('2018-10-11 00:00:00'),
        60)).to.equal(15)
    });

    it('数据测试4', function() {
      expect(func.countTimeBlockWithScale(moment(
          '2018-10-10 00:00:00'), moment('2018-10-11 00:00:00'),
        60)).to.equal(25)
    });

  });

  describe('测试getStartBlocksTime函数', function() {
    it('测试数据1', function() {
      expect( func.getStartBlocksTime(moment('2018-10-11 00:00:00')).toString())
        .to.be.equal(moment('2018-10-11 00:00:00').toString());
    });

    it('测试数据2', function() {
      expect( func.getStartBlocksTime(moment('2018-10-11 00:00:00'),3).toString())
        .to.be.equal(moment('2018-10-11 00:00:00').toString());
    });

    it('测试数据3', function() {
      expect( func.getStartBlocksTime(moment('2018-10-11 00:04:00'),3).toString())
        .to.be.equal(moment('2018-10-11 00:03:00').toString());
    });

    it('测试数据4', function() {
      expect( func.getStartBlocksTime(moment('2018-10-11 01:11:00'),10).toString())
        .to.be.equal(moment('2018-10-11 01:10:00').toString());
    });
  });

  describe('测试validateScale函数', function() {
    it('空值异常', function() {
      expect(() => func.validateScale())
        .to.throw();
    });

    it('null 值', function() {
      expect(() => func.validateScale(null))
        .to.throw();
    });

    it('undefined 值', function() {
      expect(() => func.validateScale(undefined))
        .to.throw();
    });

    it('异常scale 值报错', function() {
      expect(() => func.validateScale())
        .to.throw();
    });

    it('正常值', function() {
      expect(func.validateScale(1))
        .to.be.true;
    });

  });
});