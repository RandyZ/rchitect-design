export namespace RockTextTypes {
  export interface Props {
    type:string;
    color?:string;
    ellipsis:boolean;
    /**
     * 字体大小, 默认为H4, large为H3, small为H5，驱动中注意转换
     */
    size?:'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'large' | 'default' | 'small';
  }
}