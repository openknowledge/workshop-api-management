/*
 * Copyright open knowledge GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package de.openknowledge.sample.customer;

import static java.util.stream.Collectors.toMap;
import static java.util.stream.Collectors.toSet;

import java.io.InputStream;
import java.util.EnumSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.Predicate;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonValue;
import javax.json.JsonValue.ValueType;

import org.assertj.core.api.Condition;

public class JsonObjectComparision extends Condition<Map<String, JsonValue>> {

    public JsonObjectComparision(JsonObject object) {
        super(v -> deepContainsAll(v, object), "object containing %s", object);
    }

    public static Condition<Map<String, JsonValue>> sameAs(InputStream in) {
        return new JsonObjectComparision(Json.createReader(in).readObject());
    }

    public static Condition<JsonValue> thatIsSameAs(InputStream in) {
        Condition<? super JsonObject> condition = new JsonObjectComparision(Json.createReader(in).readObject());
        return (Condition<JsonValue>)condition;
    }

    private static boolean deepContainsAll(Map<String, JsonValue> value, JsonObject object) {
    	if (!value.keySet().containsAll(object.keySet())) {
    		return false;
    	}
    	if (!value
    		.entrySet()
    		.stream()
    		.filter(simpleValues())
    		.collect(toSet())
    		.containsAll(object.entrySet().stream().filter(simpleValues()).collect(toSet()))) {
    		return false;
    	}
    	Map<String, JsonArray> arrayProperties = value
            .entrySet()
            .stream()
            .filter(entry -> entry.getValue().getValueType() == ValueType.ARRAY)
            .collect(toMap(e -> e.getKey(), e -> JsonArray.class.cast(e.getValue())));
    	Map<String, JsonArray> arrayPropertiesToBeContained = value
            .entrySet()
            .stream()
            .filter(entry -> entry.getValue().getValueType() == ValueType.ARRAY)
            .collect(toMap(e -> e.getKey(), e -> JsonArray.class.cast(e.getValue())));
    	for (Entry<String, JsonArray> entry: arrayProperties.entrySet()) {
    		JsonArray valueToBeContained = arrayPropertiesToBeContained.get(entry.getKey());
    		if (!deepContainsAll(entry.getValue(), valueToBeContained)) {
    			return false;
    		}
    	}
    	Map<String, JsonObject> objectProperties = value
                .entrySet()
                .stream()
                .filter(entry -> entry.getValue().getValueType() == ValueType.OBJECT)
                .collect(toMap(e -> e.getKey(), e -> JsonObject.class.cast(e.getValue())));
        Map<String, JsonObject> objectPropertiesToBeContained = value
                .entrySet()
                .stream()
                .filter(entry -> entry.getValue().getValueType() == ValueType.OBJECT)
                .collect(toMap(e -> e.getKey(), e -> JsonObject.class.cast(e.getValue())));
        for (Entry<String, JsonObject> entry: objectProperties.entrySet()) {
        	JsonObject valueToBeContained = objectPropertiesToBeContained.get(entry.getKey());
        	if (!deepContainsAll(entry.getValue(), valueToBeContained)) {
        		return false;
        	}
        }
        return true;
    }

    private static boolean deepContainsAll(JsonArray array, JsonArray arrayToBeContained) {
    	if (arrayToBeContained == null) {
    		return false;
    	}
    	for (int i = 0; i < array.size(); i++) {
    		if (array.get(i).getValueType() == ValueType.OBJECT
    		    && (arrayToBeContained.get(i).getValueType() != ValueType.OBJECT
                    || !deepContainsAll(array.getJsonObject(i), arrayToBeContained.getJsonObject(i)))) {
                return false;
            } else if (array.get(i).getValueType() == ValueType.ARRAY
        		&& (arrayToBeContained.get(i).getValueType() != ValueType.ARRAY
                    || !deepContainsAll(array.getJsonArray(i), arrayToBeContained.getJsonArray(i)))) {
                return false;
            } else if (!array.get(i).equals(arrayToBeContained.get(i))) {
            	return false;
            }
        }
        return true;
    }

    private static Predicate<Entry<String, JsonValue>> simpleValues() {
    	return entry -> !EnumSet.of(ValueType.ARRAY, ValueType.OBJECT).contains(entry.getValue().getValueType());
    }
}
