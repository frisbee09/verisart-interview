import type {
	SchemaComposer,
	Resolver,
	InputTypeComposer,
} from 'graphql-compose';
import { ObjectTypeComposer } from 'graphql-compose';
import type { Model, Document } from 'mongoose';
import { resolverFactory, ComposeMongooseOpts } from 'graphql-compose-mongoose';

declare module 'graphql-compose-mongoose' {
	type PatchedGenerateResolverType<TDoc, TContext = any> = {
		[resolver in keyof typeof resolverFactory]: <TSource = any>(
			opts?: Parameters<typeof resolverFactory[resolver]>[2]
		) => typeof resolverFactory[resolver] extends (
			...args: any
		) => Resolver<any, any, infer TArgs, any>
			? Resolver<TSource, TContext, TArgs, TDoc>
			: any;
	};
	type PatchedObjectTypeComposerWithMongooseResolvers<
		TDoc,
		TContext = any
	> = ObjectTypeComposer<TDoc, TContext> & {
		mongooseResolvers: PatchedGenerateResolverType<TDoc, TContext>;
	};
	function composeMongoose<TModel extends Model<any>, TContext = any>(
		model: TModel,
		opts?: ComposeMongooseOpts<TContext>
	): PatchedObjectTypeComposerWithMongooseResolvers<
		InstanceType<TModel>,
		TContext
	>;
}