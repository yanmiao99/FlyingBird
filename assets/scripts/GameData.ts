// 存储游戏数据

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export class GameData {
  // 分数
  private static _score: number = 0;

  // 增加分数
  public static addScore(count: number = 1) {
    this._score += count;
  }

  // 获取分数
  public static getScore(): number {
    return this._score;
  }
}
