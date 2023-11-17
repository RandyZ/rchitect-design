import { PivotSheet, S2DataConfig, S2MountContainer, S2Options } from '@antv/s2'
import { get, isEmpty, filter } from 'lodash-es'

export declare interface AutoScroll {
    enable: boolean;
    step: number;
    time: number;
}

export class CubeSheet extends PivotSheet {
    public constructor(dom: S2MountContainer, dataCfg: S2DataConfig, options: S2Options) {
        super(dom, dataCfg, options);
        this.setDataCfg(this.hideColumns(dataCfg));
    }

    public setDataCfg(dataCfg: S2DataConfig, reset?: boolean) {
        dataCfg = this.hideColumns(dataCfg);
        super.setDataCfg(dataCfg, reset);
    }

    /**
     * 隐藏列
     * @param dataCfg
     */
    private hideColumns(dataCfg: S2DataConfig) {
        if (isEmpty(get(dataCfg, 'meta'))) {
            return dataCfg;
        }
        const hideColumns: string[] = filter(dataCfg.meta, meta => !meta.hide).map((meta) => meta.field);

        if (isEmpty(hideColumns)) {
            return dataCfg;
        }

        if (!isEmpty(get(dataCfg, 'fields.rows'))) {
            dataCfg.fields.rows = filter(dataCfg.fields.rows, row => {
                return hideColumns.indexOf(row) > -1;
            })
        }

        if (!isEmpty(get(dataCfg, 'fields.columns'))) {
            dataCfg.fields.columns = filter(dataCfg.fields.columns, column => {
                return hideColumns.indexOf(column) > -1;
            })
        }

        if (!isEmpty(get(dataCfg, 'fields.values'))) {
            dataCfg.fields.values = filter(dataCfg.fields.values, value => {
                return hideColumns.indexOf(value) > -1;
            })
        }

        return dataCfg;
    }

    /**
     * 当前表格是竖向否能滚动
     * @return boolean
     */
    public isCanScrollY() {
        return this.facet?.isScrollToBottom(0) === false;
    }

    public resetScrollOffset(animate: boolean) {
        if (this.facet) {
            try {
                this.facet.updateScrollOffset({ offsetX : { value: 0, animate: animate}, offsetY : { value: 0, animate: animate} })
            } catch (error) {
                console.error(error)
            }
        }
    }

    public getRowWidth() {
       return this.facet.rowHeader ? this.facet.rowHeader.headerConfig.width : 0
    }
}
