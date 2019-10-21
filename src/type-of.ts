import * as t from './types';
import {Type} from './types';


// (A) TypeOf<T> generic type operator
export type TypeOf<T extends Type> = {0:
    T extends t.any ? any :
    T extends t.array<infer Elem> ? TypeOf<Elem>[] :
    T extends t.boolean ? boolean :
    T extends t.brandedString<infer Brand> ? string & {'🎫': Brand} :
    T extends t.date ? Date :
    T extends t.intersection<infer Mems> ? TypeOfIntersection<Mems> :
    T extends t.never ? never :
    T extends t.null ? null :
    T extends t.number ? number :
    T extends t.object<infer Props> ? TypeOfObject<Props> :
    T extends t.string ? string :
    T extends t.tuple<infer Elements> ? ({[K in keyof Elements]: Elements[K] extends Type ? TypeOf<Elements[K]> : 0}) :
    T extends t.undefined ? undefined :
    T extends t.union<infer Members> ? (Members[any] extends infer E ? (E extends Type ? TypeOf<E> : 0) : 0) :
    T extends t.unit<infer Value> ? Value :
    T extends t.unknown ? unknown :
    never
}[never extends T ? 0 : 0]; // silly envelope to break tsc's direct recursion check


type TypeOfIntersection<Members extends Type[]>
    = Members[any] extends infer E ? (E extends Type ? (x: TypeOf<E>) => 0 : 0) extends ((x: infer I) => 0) ? I : 0 : 0;

type TypeOfObject<Props extends Record<string, Type | t.optional>> =
    & {[K in RequiredPropNames<Props>]: Props[K] extends Type ? TypeOf<Props[K]> : 0}
    & {[K in OptionalPropNames<Props>]?: Props[K] extends t.optional ? TypeOf<Props[K]['type']> : 0};
type RequiredPropNames<Props> = {[K in keyof Props]: Props[K] extends t.optional ? never : K}[keyof Props];
type OptionalPropNames<Props> = {[K in keyof Props]: Props[K] extends t.optional ? K : never}[keyof Props];


// (B) typeOf(v) function
