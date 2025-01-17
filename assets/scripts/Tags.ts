import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tags')
export class Tags {
  // 定义标签常量
  public static readonly LAND: number = 10; // 地板
  public static readonly PIPE: number = 20; // 管道
  public static readonly PIPE_MIDDLE: number = 30; // 管道中间
}
