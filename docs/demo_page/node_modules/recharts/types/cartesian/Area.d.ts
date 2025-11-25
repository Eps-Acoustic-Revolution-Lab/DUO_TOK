import { ComponentType } from 'react';
import { CurveType, Props as CurveProps } from '../shape/Curve';
import { ImplicitLabelListType } from '../component/LabelList';
import { ActiveDotType, AnimationDuration, AnimationTiming, DataKey, DotType, LegendType, TickItem, TooltipType } from '../util/types';
import { BaseAxisWithScale } from '../state/selectors/axisSelectors';
import { ChartData } from '../state/chartDataSlice';
import { ComputedArea } from '../state/selectors/areaSelectors';
import { AreaSettings } from '../state/types/AreaSettings';
import { ZIndexable } from '../zIndex/ZIndexLayer';
export type BaseValue = number | 'dataMin' | 'dataMax';
/**
 * External props, intended for end users to fill in
 */
interface AreaProps extends ZIndexable {
    /**
     * @default true
     */
    activeDot?: ActiveDotType;
    animationBegin?: number;
    animationDuration?: AnimationDuration;
    animationEasing?: AnimationTiming;
    baseValue?: BaseValue;
    className?: string;
    connectNulls?: boolean;
    data?: ChartData;
    /**
     * dataKey is indeed required - some other graphical elements will use the combination of axes to
     * imply the dataKey, but Area always needs an explicit dataKey.
     */
    dataKey: DataKey<any>;
    dot?: DotType;
    hide?: boolean;
    id?: string;
    isAnimationActive?: boolean | 'auto';
    isRange?: boolean;
    label?: ImplicitLabelListType;
    legendType?: LegendType;
    name?: string | number;
    onAnimationEnd?: () => void;
    onAnimationStart?: () => void;
    stackId?: string | number;
    tooltipType?: TooltipType;
    type?: CurveType;
    unit?: string | number;
    xAxisId?: string | number;
    yAxisId?: string | number;
    /**
     * @since 3.4
     * @defaultValue 100
     */
    zIndex?: number;
}
/**
 * Because of naming conflict, we are forced to ignore certain (valid) SVG attributes.
 */
type AreaSvgProps = Omit<CurveProps, 'type' | 'points' | 'ref'>;
export type Props = AreaSvgProps & AreaProps;
export declare const defaultAreaProps: {
    readonly activeDot: true;
    readonly animationBegin: 0;
    readonly animationDuration: 1500;
    readonly animationEasing: "ease";
    readonly connectNulls: false;
    readonly dot: false;
    readonly fill: "#3182bd";
    readonly fillOpacity: 0.6;
    readonly hide: false;
    readonly isAnimationActive: "auto";
    readonly legendType: "line";
    readonly stroke: "#3182bd";
    readonly type: "linear";
    readonly label: false;
    readonly xAxisId: 0;
    readonly yAxisId: 0;
    readonly zIndex: 100;
};
export declare const getBaseValue: (layout: "horizontal" | "vertical", chartBaseValue: BaseValue | undefined, itemBaseValue: BaseValue | undefined, xAxis: BaseAxisWithScale, yAxis: BaseAxisWithScale) => number;
export declare function computeArea({ areaSettings: { connectNulls, baseValue: itemBaseValue, dataKey }, stackedData, layout, chartBaseValue, xAxis, yAxis, displayedData, dataStartIndex, xAxisTicks, yAxisTicks, bandSize, }: {
    areaSettings: AreaSettings;
    stackedData: number[][] | undefined;
    layout: 'horizontal' | 'vertical';
    chartBaseValue: BaseValue | undefined;
    xAxis: BaseAxisWithScale;
    yAxis: BaseAxisWithScale;
    displayedData: ChartData;
    dataStartIndex: number;
    xAxisTicks: TickItem[];
    yAxisTicks: TickItem[];
    bandSize: number;
}): ComputedArea;
export declare const Area: ComponentType<Props>;
export {};
