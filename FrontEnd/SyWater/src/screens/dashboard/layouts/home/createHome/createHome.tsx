import React, { useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import FeedbackModal from "@components/common/FeedbackModal";
import InputField from "@components/auth/InputField";
import CountrySelectField from "@components/auth/CountrySelectField";
import StratumSelectField from "@components/auth/StratumSelectField";
import { useTheme, spacing, typography } from "@theme/index";
import { useTranslation } from "react-i18next";

export type Home = {
	name: string;
	address: string;
	country: string;
	stratum: string;
	inhabitants: string;
};

type Props = {
	existingHomes?: Home[];
	onCreateHome?: (home: Home) => void | Promise<void>;
	onCancel?: () => void;
};

const clean = (value: string) =>
	value
		.trim()
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");

export default function CreateHome({
	existingHomes = [],
	onCreateHome,
	onCancel,
}: Props) {
	// Hooks DEBEN estar dentro del componente
	const { t } = useTranslation("register");
	const { colors } = useTheme();

	const [country, setCountry] = useState("Colombia");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [stratum, setStratum] = useState("");
	const [inhabitants, setInhabitants] = useState("");
	const [errors, setErrors] = useState<{
		name?: string;
		address?: string;
		stratum?: string;
		inhabitants?: string;
	}>({});
	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState<string | null>(null);
	const [feedbackError, setFeedbackError] = useState(false);
	const stratumOptions = country === "Ecuador"
		? ["A", "B", "C+", "C-", "D"]
		: ["1", "2", "3", "4", "5", "6"];
	const isPositiveInteger = (value: string) => /^[1-9][0-9]*$/.test(value);

	const submit = async () => {
		const next: typeof errors = {};

		if (!name.trim()) {
			next.name = "El nombre del hogar es obligatorio.";
		}

		if (!address.trim()) {
			next.address = "La dirección es obligatoria.";
		}
		if (!stratum.trim() || !stratumOptions.includes(stratum.trim())) {
			next.stratum = "Selecciona un estrato válido.";
		}
		if (!inhabitants.trim() || !isPositiveInteger(inhabitants.trim())) {
			next.inhabitants = "Ingresa una cantidad válida de habitantes.";
		}

		const duplicate = existingHomes.some(
			(home) =>
				clean(home.name) === clean(name) ||
				clean(home.address) === clean(address),
		);

		if (duplicate) {
			next.name = "Ya existe un hogar con ese nombre o dirección.";
			next.address = "Ya existe un hogar con ese nombre o dirección.";
		}

		setErrors(next);

		if (Object.keys(next).length > 0) {
			return;
		}

		try {
			setLoading(true);

			await onCreateHome?.({
				name: name.trim(),
				address: address.trim(),
				country: country.trim(),
				stratum: stratum.trim(),
				inhabitants: inhabitants.trim(),
			});

			setFeedbackError(false);
			setFeedback("El hogar se creó correctamente.");

			setName("");
			setAddress("");
			setStratum("");
			setInhabitants("");
		} catch {
			setFeedbackError(true);
			setFeedback(
				"No fue posible crear el hogar. Inténtalo nuevamente.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.modalBody}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={[styles.container, { backgroundColor: colors.surface }]}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator
			>
			<Text style={[styles.title, { color: colors.textPrimary }]}>Crear hogar</Text>

			<Text style={[styles.subtitle, { color: colors.textMuted }]}>
				Registra los datos de tu hogar
			</Text>

			<InputField
				label="Nombre del hogar"
				value={name}
				placeholder="Ej. Mi casa"
				onChangeText={(value) => {
					setName(value);
					setErrors((current) => ({
						...current,
						name: undefined,
					}));
				}}
				errorMessage={errors.name}
			/>

			<InputField
				label="Dirección"
				value={address}
				placeholder="Ej. Calle 123 #45-67"
				onChangeText={(value) => {
					setAddress(value);
					setErrors((current) => ({
						...current,
						address: undefined,
					}));
				}}
				errorMessage={errors.address}
			/>

			<CountrySelectField
				label={t("section2.input6") ?? ""}
				value={country}
				onCountryChange={(selectedCountry) => {
					setCountry(selectedCountry);
					setStratum("");
					setErrors((current) => ({
						...current,
						stratum: undefined,
					}));
				}}
			/>

			<StratumSelectField
				label={t("section2.input4") ?? "Estrato"}
				value={stratum}
				onChange={(value) => {
					setStratum(value);
					setErrors((current) => ({
						...current,
						stratum: undefined,
					}));
				}}
				options={stratumOptions}
				errorMessage={errors.stratum}
			/>

			<InputField
				label={t("section2.input5") ?? "Cantidad de habitantes"}
				value={inhabitants}
				placeholder="Ej. 4"
				keyboardType="numeric"
				onChangeText={(value) => {
					setInhabitants(value);
					setErrors((current) => ({
						...current,
						inhabitants: undefined,
					}));
				}}
				errorMessage={errors.inhabitants}
			/>

			<View style={[styles.actions, { borderTopColor: colors.border }]}>
				{onCancel && (
					<TouchableOpacity
						onPress={onCancel}
						style={[styles.cancel, { borderColor: colors.border }]}
					>
						<Text style={[styles.cancelText, { color: colors.textSecondary }]}>
							Cancelar
						</Text>
					</TouchableOpacity>
				)}

				<TouchableOpacity
					onPress={submit}
					disabled={loading}
					style={[styles.button, { backgroundColor: colors.primary }]}
				>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.buttonText}>
							Crear hogar
						</Text>
					)}
				</TouchableOpacity>
			</View>
			</ScrollView>

			<FeedbackModal
				visible={feedback !== null}
				title={feedbackError ? "Error" : "¡Listo!"}
				message={feedback ?? ""}
				type={feedbackError ? "error" : "success"}
				onClose={() => setFeedback(null)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	modalBody: {
		flex: 1,
	},

	scrollView: {
		flex: 1,
	},

	container: {
		padding: spacing.lg,
		paddingBottom: spacing.xl,
	},

	title: {
		...typography.title,
	},

	subtitle: {
		...typography.body,
		marginTop: spacing.xs,
		marginBottom: spacing.lg,
	},

	actions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: spacing.md,
		paddingTop: spacing.md,
		borderTopWidth: StyleSheet.hairlineWidth,
	},

	cancel: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		marginRight: spacing.sm,
	},

	cancelText: {
		fontWeight: "600",
	},

	button: {
		borderRadius: 10,
		padding: spacing.md,
		minWidth: 130,
		alignItems: "center",
	},

	buttonText: {
		color: "#fff",
		fontWeight: "700",
	},
});

