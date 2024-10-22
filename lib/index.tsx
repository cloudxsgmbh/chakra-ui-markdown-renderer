import * as React from 'react';
import deepmerge from 'deepmerge';
import { Components } from 'react-markdown';
import {
  Checkbox,
  Code,
  Divider,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from '@chakra-ui/react';
/* import { chakra } from '@chakra-ui/system'; */

type GetCoreProps = {
  children?: React.ReactNode;
  'data-sourcepos'?: any;
};

function getCoreProps(props: GetCoreProps): any {
  return props['data-sourcepos']
    ? { 'data-sourcepos': props['data-sourcepos'] }
    : {};
}

const defaults: Components = {
  p: props => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
  em: props => {
    const { children } = props;
    return <Text as="em">{children}</Text>;
  },
  blockquote: props => {
    const { children } = props;
    return (
      <Code as="blockquote" p={2}>
        {children}
      </Code>
    );
  },
  code: props => {
    const { style, children, className } = props;

    const inline = style?.display === 'inline';
    if (inline) {
      return <Code p={2} children={children} />;
    }

    return (
      <Code
        className={className}
        whiteSpace="break-spaces"
        display="block"
        w="full"
        p={2}
        children={children}
      />
    );
  },
  del: props => {
    const { children } = props;
    return <Text as="del">{children}</Text>;
  },
  hr: () => {
    return <Divider />;
  },
  a: Link,
  img: Image,
  text: props => {
    const { children } = props;
    return <Text as="span">{children}</Text>;
  },
  ul: props => {
    const { children } = props;
    const attrs = getCoreProps(props);
    const Element = UnorderedList;
    const styleType = 'disc';
    return (
      <Element spacing={2} styleType={styleType} pl={4} {...attrs}>
        {children}
      </Element>
    );
  },
  ol: props => {
    const { children } = props;
    const attrs = getCoreProps(props);
    const Element = OrderedList;
    const styleType = 'disc';

    return (
      <Element spacing={2} styleType={styleType} pl={4} {...attrs}>
        {children}
      </Element>
    );
  },
  li: props => {
    const { children, defaultChecked } = props;
    let checkbox = null;
    if (defaultChecked !== null && defaultChecked !== undefined) {
      checkbox = (
        <Checkbox isChecked={defaultChecked} isReadOnly>
          {children}
        </Checkbox>
      );
    }
    return (
      <ListItem
        {...getCoreProps(props)}
        listStyleType={defaultChecked !== null ? 'none' : 'inherit'}
      >
        {checkbox || children}
      </ListItem>
    );
  },
  /* heading: props => {
    const {  children,  } = props;
    const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    return (
      <Heading
        my={4}
        as={`h${level}`}
        size={sizes[`${level - 1}`]}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  }, */
  h1: props => {
    const { children } = props;
    return (
      <Heading as="h1" {...getCoreProps(props)}>
        {children}
      </Heading>
    );
  },
  h2: props => {
    const { children } = props;
    return (
      <Heading as="h2" {...getCoreProps(props)}>
        {children}
      </Heading>
    );
  },
  h3: props => {
    const { children } = props;
    return (
      <Heading as="h3" {...getCoreProps(props)}>
        {children}
      </Heading>
    );
  },
  h4: props => {
    const { children } = props;
    return (
      <Heading as="h4" {...getCoreProps(props)}>
        {children}
      </Heading>
    );
  },
  h5: props => {
    const { children } = props;
    return (
      <Heading as="h5" {...getCoreProps(props)}>
        {children}
      </Heading>
    );
  },
  h6: props => {
    const { children } = props;
    return (
      <Heading as="h6" {...getCoreProps(props)}>
        {children}
      </Heading>
    );
  },

  /* pre: props => {
    const { children } = props;
    return <chakra.pre {...getCoreProps(props)}>{children}</chakra.pre>;
  }, */
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: props => <Tr>{props.children}</Tr>,
  td: props => <Td>{props.children}</Td>,
  th: props => <Th>{props.children}</Th>,
};

function ChakraUIRenderer(theme?: Components, merge = true): Components {
  const elements = {
    p: defaults.p,
    em: defaults.em,
    blockquote: defaults.blockquote,
    code: defaults.code,
    del: defaults.del,
    hr: defaults.hr,
    a: defaults.a,
    img: defaults.img,
    text: defaults.text,
    ul: defaults.ul,
    ol: defaults.ol,
    li: defaults.li,
    h1: defaults.h1,
    h2: defaults.h2,
    h3: defaults.h3,
    h4: defaults.h4,
    h5: defaults.h5,
    h6: defaults.h6,
    //pre: defaults.pre,
    table: defaults.table,
    thead: defaults.thead,
    tbody: defaults.tbody,
    tr: defaults.tr,
    td: defaults.td,
    th: defaults.th,
  };

  if (theme && merge) {
    return deepmerge(elements, theme);
  }

  return elements;
}

export default ChakraUIRenderer;
