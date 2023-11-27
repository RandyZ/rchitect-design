import { Bean } from '@rchitect-rock/ioc';
import mitt from 'mitt'
import type { EventType, Emitter, Handler } from 'mitt'
import { onMounted, onUnmounted } from 'vue-demi'

export type Events = Record<EventType, {
    /**
     * 事件数据
     */
    data?: any,
    /**
     * 用于vue的事件机制emit事件
     * @param event 
     * @param args 
     * @returns 
     */
    vueEmit?: (event: any, ...args: any[]) => void
}>;

@Bean()
export class DataEventBus {
    dataEventBus: Emitter<Events>;
    constructor() {
        this.dataEventBus = mitt()
    }
    $on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void {
        this.dataEventBus.on(type, handler)
    }
    $off<Key extends keyof Events>(type: Key): void {
        this.dataEventBus.off(type)
    }
    $emit<Key extends keyof Events>(type: Key, event?: Events[Key]): void {
        if (event?.vueEmit) {
            event.vueEmit(type, event)
        } else {
            this.dataEventBus.emit(type, event || {})
        }
    }
    $clear(): void {
        this.dataEventBus.all.clear()
    }
    $watchWithVue<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): DataEventBus {
        const self = this;
        onMounted(() => {
            self.$on(type, handler)
        })
        onUnmounted(() => {
            self.$off(type)
        })
        return self
    }
}

