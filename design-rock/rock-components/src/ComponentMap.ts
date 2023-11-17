import { Bean } from '@rchitect-rock/ioc';
import { RockComponent } from './RockComponent';
@Bean()
export default class ComponentMap {
  private map: Map<RockComponent, WmqComponent<any> >;
  constructor() {
    this.map = new Map<RockComponent, WmqComponent<any> >();
  }
  public register(key: string | RockComponent, value: WmqComponent<any> ) {
    this.map.set(key as RockComponent, value);
  }
  public unregister(key: RockComponent) {
    this.map.delete(key);
  }
  public get(key: string | RockComponent): WmqComponent<any>  | undefined {
    return this.map.get(key as RockComponent);
  }
  public has(key: string | RockComponent) {
    return this.map.has(key as RockComponent);
  }
  public clear() {
    this.map.clear();
  }
  public get size() {
    return this.map.size;
  }
  public get keys(): IterableIterator<RockComponent> {
    return this.map.keys();
  }
  public get values(): IterableIterator<WmqComponent<any> > {
    return this.map.values();
  }
  public get entries(): IterableIterator<[string | RockComponent, WmqComponent<any>]> {
    return this.map.entries();
  }
}
