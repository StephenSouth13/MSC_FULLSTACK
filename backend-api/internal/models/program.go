package models

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

// StringArray is a custom type to handle PostgreSQL text[] arrays
type StringArray []string

// Scan implements the sql.Scanner interface for reading from database
func (s *StringArray) Scan(value interface{}) error {
	if value == nil {
		*s = StringArray{}
		return nil
	}

	switch v := value.(type) {
	case []byte:
		// Handle JSON array format: ["item1", "item2"]
		if len(v) > 0 && v[0] == '[' {
			var arr []string
			if err := json.Unmarshal(v, &arr); err == nil {
				*s = StringArray(arr)
				return nil
			}
		}
		// Handle PostgreSQL array format: {item1,item2}
		str := string(v)
		return s.scanPostgreSQLArray(str)
	case string:
		// Handle JSON array format: ["item1", "item2"]
		if len(v) > 0 && v[0] == '[' {
			var arr []string
			if err := json.Unmarshal([]byte(v), &arr); err == nil {
				*s = StringArray(arr)
				return nil
			}
		}
		// Handle PostgreSQL array format: {item1,item2}
		return s.scanPostgreSQLArray(v)
	case pq.StringArray:
		*s = StringArray(v)
		return nil
	default:
		return fmt.Errorf("cannot scan %T into StringArray", value)
	}
}

// scanPostgreSQLArray parses PostgreSQL array format {item1,item2}
func (s *StringArray) scanPostgreSQLArray(str string) error {
	if str == "" || str == "{}" {
		*s = StringArray{}
		return nil
	}

	// Remove braces and split by comma
	str = strings.Trim(str, "{}")
	if str == "" {
		*s = StringArray{}
		return nil
	}

	parts := strings.Split(str, ",")
	result := make([]string, len(parts))
	for i, part := range parts {
		// Remove quotes if present and trim whitespace
		result[i] = strings.Trim(strings.TrimSpace(part), `"`)
	}

	*s = StringArray(result)
	return nil
}

// Value implements the driver.Valuer interface for writing to database
func (s StringArray) Value() (driver.Value, error) {
	if len(s) == 0 {
		return "{}", nil
	}

	// Use pq.Array for proper PostgreSQL array formatting
	return pq.Array([]string(s)).Value()
}

type Program struct {
	ID              uuid.UUID   `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Slug            string      `json:"slug" gorm:"uniqueIndex;not null"`
	Title           string      `json:"title" gorm:"not null"`
	Description     string      `json:"description"`
	DetailedContent string      `json:"detailed_content"`
	Duration        string      `json:"duration"`
	Students        string      `json:"students"`
	Level           string      `json:"level"`
	Price           string      `json:"price"`
	Image           string      `json:"image"`
	Highlights      StringArray `json:"highlights" gorm:"type:text[]"`
	CreatedAt       time.Time   `json:"created_at"`
	UpdatedAt       time.Time   `json:"updated_at"`
	Category        string      `json:"category" gorm:"type:varchar(100)"`
}
