<script lang="tsx">
import type { CSSProperties, PropType } from 'vue';
import { defineComponent, computed, unref } from 'vue';
import { isString, isArray, getSlot } from '@rchitect-rock/tools';
// TODO: 引用路径
import { RockComponent, Lib as componentLib } from "@rchitect-rock/components";
import { diKT } from '@rchitect-rock/ioc';
import { useDesign } from '@rchitect-rock/hooks';
const props = {
  /**
   * Help text max-width
   * @default: 600px
   */
  maxWidth: { type: String, default: '600px' },
  /**
   * Whether to display the serial number
   * @default: false
   */
  showIndex: { type: Boolean },
  /**
   * Help text font color
   * @default: #ffffff
   */
  color: { type: String, default: '#ffffff' },
  /**
   * Help text font size
   * @default: 14px
   */
  fontSize: { type: String, default: '14px' },
  /**
   * Help text list
   */
  placement: { type: String, default: 'right' },
  /**
   * Help text effect
   */
  effect: { type: String, default: 'light' },
  /**
   * Help text list
   */
  text: { type: [Array, String] as PropType<string[] | string> },
};

export default defineComponent({
  name: 'BasicHelp',
  props,
  setup(props, { slots }) {
    const { prefixCls } = useDesign('basic-help');

    const getTooltipStyle = computed(
        (): CSSProperties => ({ color: props.color, fontSize: props.fontSize }),
    );

    const getOverlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }));

    function renderTitle() {
      const textList = props.text;

      if (isString(textList)) {
        return textList;
      }

      // TODO: 如何修改
      if (isArray(textList)) {
        return textList.map((text, index) => {
          return (
              <p key={text}>
                <>
                  {props.showIndex ? `${index + 1}. ` : ''}
                  {text}
                </>
              </p>
          );
        });
      }
      return null;
    }

    return () => {
      // TODO: 修改为driver
      const componentMap = diKT(componentLib.types.ComponentMap);
      const WmqTooltip = componentMap.get(RockComponent.Tooltip);
      const WmqIconify = componentMap.get(RockComponent.Iconify);
      return (
          <WmqTooltip
              overlayClassName={`${prefixCls}__wrap`}
              content={renderTitle()}
              raw-content={true}
              autoAdjustOverflow={true}
              overlayStyle={unref(getOverlayStyle)}
              effect={props.effect as 'light'}
              placement={props.placement as 'right'}
          >
            <span class={prefixCls}>{getSlot(slots) || <WmqIconify icon="material-symbols:error-circle-rounded-outline" />}</span>
          </WmqTooltip>
      );
    };
  },
});
</script>
<style lang="less">
// TODO: 样式
@namespace: vben;
@prefix-cls: ~'@{namespace}-basic-help';

.@{prefix-cls} {
  display: inline-block;
  margin-left: 6px;
  //color: @text-color-help-dark;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    //color: @primary-color;
  }

  &__wrap {
    p {
      margin-bottom: 0;
    }
  }
}
</style>
