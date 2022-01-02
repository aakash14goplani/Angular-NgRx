import { FunctionWithParametersType, ActionCreator, ActionType } from '@ngrx/store/src/models';
import produce, { Draft } from 'immer';
import { on } from '@ngrx/store';

export default function produceOn<Type extends string, C extends FunctionWithParametersType<any, any>, State>(
  actionType: ActionCreator<Type, C>,
  callback: (draft: Draft<State>, action: ActionType<ActionCreator<Type, C>>) => any
) {
  return on<State, [ActionCreator<Type, C>]>(actionType, (state, action) => produce(state, draft => callback(draft as Draft<State>, action)));
}
