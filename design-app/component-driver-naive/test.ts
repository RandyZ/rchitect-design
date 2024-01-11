interface ParentProps {
  a: string;
  b: number;
}

interface Child1Props {
  a: boolean;
  c: string;
}

interface Child2Props {
  b: boolean;
}

type C1Props = Omit<ParentProps, 'b'> & {c: string};

type Props = Omit<Child1Props & Child2Props, 'c'>;